import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import {OSM, TileWMS} from 'ol/source';
import {Layer as OlLayer} from 'ol/layer';
import {MapBrowserEvent, View, Map as OlMap} from 'ol';
import {LayerService} from '../layer/layer.service';
import {Unsubscriber} from '../common/unsubscriber';
import {Layer} from '../layer/layer';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent extends Unsubscriber implements OnInit {
  public map: OlMap;

  private layerMapping: Map<Layer, OlLayer> = new Map<Layer, OlLayer>();

  public constructor(private layerService: LayerService) {
    super();

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
        center: [1110161, 7085688],
        projection: 'EPSG:3857',
        zoom: 14,
        minZoom: 0,
        maxZoom: 19
      })
    });
  }

  ngOnInit(): void {
    this.map.setTarget('map')

    // TODO React to clicks, i.e. request feature information:
    this.map.on('click', (event: MapBrowserEvent<UIEvent>) => console.log('click on coordinate ' + event.coordinate));

    this.unsubscribeLater(this.layerService.layers.subscribe(layers => {
      let olLayers: OlLayer[] = [
        new TileLayer({
          source: new OSM()
        })
      ];

      // TODO maybe unsubscribe from visible observable if needed
      this.layerMapping.clear();
      layers.forEach(layer => {
        let wmsLayer = new TileLayer({
          source: new TileWMS({
            url: layer.wmsBaseUrl,
            params: {'LAYERS': layer.wmsLayerName, 'TILED': true},
          }),
        });
        this.layerMapping.set(layer, wmsLayer);
        olLayers.push(wmsLayer);
      });

      this.map.getAllLayers().forEach(layer => this.map.removeLayer(layer));
      olLayers.forEach(layer => this.map.addLayer(layer));
    }))
  }
}
