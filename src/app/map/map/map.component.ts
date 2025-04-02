import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import {Map as OlMap, MapBrowserEvent, MapEvent, View} from 'ol';
import {LayerService} from '../../layer/layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer} from '../../layer/layer';
import {ConfigService} from '../../config/config.service';
import {ViewOptions} from 'ol/View';
import {MapService} from '../map.service';
import {MapLayerComponent} from '../../layer/map-layer/map-layer.component';
import {NgForOf} from '@angular/common';
import {MapClickEvent} from '../../common/map-click-event';
import {ActivatedRoute, Router} from '@angular/router';
import {Coordinate} from 'ol/coordinate';

@Component({
  selector: 'app-map',
  imports: [
    MapLayerComponent,
    NgForOf
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
    private route: ActivatedRoute,
    private router: Router,
    configService: ConfigService,
  ) {
    super();

    let defaultViewOptions: ViewOptions = {
      center: [1110161, 7085688], // Hamburg, Germany
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
      view: new View({
        ...defaultViewOptions,
        ...configService.config?.mapView,
      })
    });

    this.route.queryParamMap.subscribe(paramMap => {
      if (paramMap.has("center")) {
        let coordinate = JSON.parse(paramMap.get("center")!) as Coordinate;
        this.map.getView().setCenter(coordinate);
      }
      if (paramMap.has("resolution")) {
        let resolution = +paramMap.get("resolution")!;
        this.map.getView().setResolution(resolution);
        this.mapService.changeResolution(this.map.getView().getResolution());
      }
    })

    this.mapService.changeProjection(this.map.getView().getProjection());
    this.mapService.changeResolution(this.map.getView().getResolution());
  }

  ngOnInit(): void {
    this.map.setTarget("map")

    this.map.on("click", (event: MapBrowserEvent<UIEvent>) => {
      let queryParams = {coordinate: JSON.stringify(event.coordinate)};
      this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
      this.handleCoordinateClick(event.coordinate);
    });
    this.map.on("moveend", (e: MapEvent) => {
      this.onResolutionChanged();
    });

    this.unsubscribeLater(this.layerService.layers.subscribe(layers => {
      console.log(`Updating layers. Got ${layers.length} layers.`);

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

    let resolution = this.map.getView().getResolution();
    if (resolution) {
      this.mapService.click(new MapClickEvent(coordinate, resolution, this.map.getView().getProjection()));
    }
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
