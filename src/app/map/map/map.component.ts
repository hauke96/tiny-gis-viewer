import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import {Map as OlMap, MapBrowserEvent, MapEvent, View} from 'ol';
import {LayerService} from '../layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer, WmsCapabilitiesLayer} from '../layer';
import {ConfigService} from '../../config/config.service';
import {ViewOptions} from 'ol/View';
import {MapService} from '../map.service';
import {MapLayerComponent} from '../map-layer/map-layer.component';
import {NgForOf} from '@angular/common';
import {MapClickEvent} from '../../common/map-click-event';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Coordinate} from 'ol/coordinate';
import {PinLayerComponent} from '../pin-layer/pin-layer.component';
import {filter, first, of, switchMap} from 'rxjs';
import {FeatureSelectionService} from '../feature-selection.service';

@Component({
  selector: 'app-map',
  imports: [
    MapLayerComponent,
    NgForOf,
    PinLayerComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent extends Unsubscriber implements OnInit {
  public map: OlMap;

  protected layers: Layer[] = [];

  public constructor(
    private mapService: MapService,
    private layerService: LayerService,
    private featureSelectionService: FeatureSelectionService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) {
    super();

    let defaultViewOptions: ViewOptions = {
      center: [1112312, 7085764], // Hamburg, Germany
      projection: 'EPSG:3857',
      zoom: 14,
      minZoom: 0,
      maxZoom: 22,
    };

    this.map = new OlMap({
      controls: [
        new ScaleLine(),
        new Attribution({collapsible: true, collapsed: false})
      ],
      layers: [],
      view: new View(defaultViewOptions)
    });

    this.configService.config.subscribe(c => {
      this.map.setView(new View({
        ...defaultViewOptions,
        ...configService.currentConfig?.mapView,
      }))
    })

    // Read params once at the end of route navigation
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => this.route.queryParamMap || of()),
        first())
      .subscribe(paramMap => {
        if (paramMap.has("center")) {
          let coordinate = JSON.parse(paramMap.get("center")!) as Coordinate;
          this.map.getView().setCenter(coordinate);
        }
        if (paramMap.has("resolution")) {
          let resolution = +paramMap.get("resolution")!;
          this.map.getView().setResolution(resolution);
          this.mapService.changeResolution(this.map.getView().getResolution());
        }
        if (paramMap.has("click")) {
          let event = MapClickEvent.fromString(paramMap.get("click")!);
          this.mapService.click(event);
        }
      })

    this.mapService.changeProjection(this.map.getView().getProjection());
    this.mapService.changeResolution(this.map.getView().getResolution());
  }

  ngOnInit(): void {
    this.map.setTarget("map")

    this.map.on("click", (event: MapBrowserEvent<UIEvent>) => {
      this.handleCoordinateClick(event.coordinate);
    });
    this.map.on("moveend", (e: MapEvent) => {
      this.onResolutionChanged();
    });

    this.unsubscribeLater(this.layerService.layers.subscribe(layers => {
      console.log(`Updating layers. Got ${layers.length} layers.`);

      layers = layers.flatMap(l => {
        if (l instanceof WmsCapabilitiesLayer) {
          return l.wmsLayers;
        }
        return [l];
      })

      // Reverse layers so that the first layer is on top
      layers = layers.slice();
      layers.reverse();

      this.layers = layers;
    }));

    this.unsubscribeLater(
      this.mapService.layerAdded.subscribe(layer => this.map.addLayer(layer)),
      this.mapService.layerRemoved.subscribe(layer => this.map.removeLayer(layer)),
      this.mapService.interactionAdded.subscribe(interaction => this.map.addInteraction(interaction)),
      this.mapService.interactionRemoved.subscribe(interaction => this.map.removeInteraction(interaction)),
      this.mapService.zoomedIn.subscribe(() => this.zoomIn()),
      this.mapService.zoomedOut.subscribe(() => this.zoomOut()),
    )
  }

  private onResolutionChanged() {
    let queryParams = {
      center: JSON.stringify(this.map.getView().getCenter()),
      resolution: this.map.getView().getResolution()
    };
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
  }

  private handleCoordinateClick(coordinate: Array<number>) {
    console.log("Click on coordinate " + coordinate);

    this.featureSelectionService.unfocusFeature().subscribe(() => {
      let resolution = this.map.getView().getResolution();
      if (resolution) {
        this.mapService.click(new MapClickEvent(coordinate, resolution, this.map.getView().getProjection()));
      }
    })
  }

  public zoomIn(): void {
    const zoom = this.map?.getView()?.getZoom();
    if (zoom) {
      this.map?.getView().animate({zoom: zoom + 0.5, duration: 250});
    }
  }

  public zoomOut(): void {
    const zoom = this.map?.getView()?.getZoom();
    if (zoom) {
      this.map?.getView().animate({zoom: zoom - 0.5, duration: 250});
    }
  }
}
