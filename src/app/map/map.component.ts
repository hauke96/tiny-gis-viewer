import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import {ImageWMS, OSM} from 'ol/source';
import {Layer as OlLayer} from 'ol/layer';
import {Feature, Map as OlMap, MapBrowserEvent, MapEvent, View} from 'ol';
import {LayerService} from '../layer/layer.service';
import {Unsubscriber} from '../common/unsubscriber';
import {Layer} from '../layer/layer';
import {forkJoin, map, of, Subscription} from 'rxjs';
import ImageLayer from 'ol/layer/Image';
import {ConfigService} from '../config/config.service';
import {ViewOptions} from 'ol/View';
import {HttpClient} from '@angular/common/http';
import {GeoJSON} from 'ol/format';
import {FeatureSelectionService} from '../feature/feature-selection.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent extends Unsubscriber implements OnInit {
  public map: OlMap;

  private layerSubscriptions: Subscription[] = [];
  private layerMapping: Map<Layer, OlLayer> = new Map<Layer, OlLayer>();

  public constructor(
    private layerService: LayerService,
    private featureSelectionService: FeatureSelectionService,
    private httpClient: HttpClient,
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

    let storedMapCenter = localStorage.getItem('map_center');
    let storedMapZoom = localStorage.getItem('map_zoom');
    let storedViewOptions: ViewOptions = {
      center: storedMapCenter ? JSON.parse(storedMapCenter) : defaultViewOptions.center,
      zoom: storedMapZoom ? JSON.parse(storedMapZoom) : defaultViewOptions.zoom,
    }

    this.map = new OlMap({
      controls: [
        new ScaleLine(),
        new Attribution()
      ],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        ...defaultViewOptions,
        ...configService.config?.mapView,
        ...storedViewOptions
      })
    });
  }

  ngOnInit(): void {
    this.map.setTarget('map')

    this.map.on('click', (event: MapBrowserEvent<UIEvent>) => {
      let coordinate = event.coordinate;
      console.log('click on coordinate ' + coordinate);

      let geoJSON = new GeoJSON();

      let requestObservables = this.map.getAllLayers()
        .filter(layer => {
          let source = layer.getSource();
          return source && source instanceof ImageWMS;
        })
        .map(layer => {
          let source = layer.getSource() as ImageWMS;

          let featureInfoUrl = source.getFeatureInfoUrl(coordinate, this.map.getView().getResolution()!, this.map.getView().getProjection(), {'INFO_FORMAT': 'application/json'});
          if (!featureInfoUrl) {
            return of("").pipe(map(response => [layer, response]));
          }

          return this.httpClient.get<string>(featureInfoUrl).pipe(map(response => [layer, response]));
        });
      forkJoin(requestObservables)
        .subscribe(responseTuples => {
          let layerToFeaturesMap = new Map<Layer, Feature[]>();
          responseTuples
            .map(tuple => {
              const olLayer = tuple[0] as OlLayer;
              const response = tuple[1];

              let features = geoJSON.readFeatures(response);

              let layerName = olLayer.getProperties()["name"] as string;
              let layer = Array.from(this.layerMapping.keys()).filter(l => l.name === layerName)[0];

              return [layer, features] as [Layer, Feature[]];
            })
            .filter(tuple => tuple[1] && tuple[1].length > 0)
            .forEach(tuple => layerToFeaturesMap.set(tuple[0], tuple[1]));
          this.featureSelectionService.setSelectedFeaturesOnMap(layerToFeaturesMap);
        });
    });
    this.map.on('moveend', (e: MapEvent) => {
      localStorage.setItem('map_center', JSON.stringify(e.map.getView().getCenter()));
      localStorage.setItem('map_zoom', '' + e.map.getView().getZoom());
    });

    this.unsubscribeLater(this.layerService.layers.subscribe(layers => {
      console.log(`Updating layers. Got ${layers.length} layers.`);

      // Reverse layers so that the first layer is on top
      layers = layers.slice();
      layers.reverse();

      let olLayers: OlLayer[] = [
        new TileLayer({
          source: new OSM()
        })
      ];

      this.layerMapping.clear();
      this.layerSubscriptions.forEach(subscription => subscription.unsubscribe());
      this.layerSubscriptions = [];

      layers.forEach(layer => {
        let wmsLayer = new ImageLayer({
          source: new ImageWMS({
            url: layer.wmsBaseUrl,
            params: {'LAYERS': layer.wmsLayerName}
          }),
          properties: {'name': layer.name}
        });

        let subscription = layer.visible.subscribe((visible) => wmsLayer.setVisible(visible));
        this.layerSubscriptions.push(subscription);

        this.layerMapping.set(layer, wmsLayer);
        olLayers.push(wmsLayer);
      });

      this.map.getAllLayers().forEach(layer => this.map.removeLayer(layer));
      olLayers.forEach(layer => this.map.addLayer(layer));
    }))
  }
}
