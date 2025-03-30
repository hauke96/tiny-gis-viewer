import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import {ImageWMS, OSM} from 'ol/source';
import {Layer as OlLayer} from 'ol/layer';
import {Map as OlMap, MapBrowserEvent, MapEvent, View} from 'ol';
import {LayerService} from '../layer/layer.service';
import {Unsubscriber} from '../common/unsubscriber';
import {Layer} from '../layer/layer';
import {Subscription} from 'rxjs';
import ImageLayer from 'ol/layer/Image';
import {ConfigService} from '../config/config.service';
import {ViewOptions} from 'ol/View';

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

    // TODO React to clicks, i.e. request feature information?
    this.map.on('click', (event: MapBrowserEvent<UIEvent>) => console.log('click on coordinate ' + event.coordinate));
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
            params: {'LAYERS': layer.wmsLayerName},
          }),
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
