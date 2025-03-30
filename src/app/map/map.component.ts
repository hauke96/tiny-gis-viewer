import {Component, OnInit} from '@angular/core';
import {Attribution, ScaleLine} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {MapBrowserEvent, View, Map} from 'ol';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  public map: Map;

  public constructor() {
    this.map = new Map({
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

    // TODO react to events like this:
    // this.unsubscribeLater(this.layerService.onLayerAdded.subscribe((layer: BaseLayer) => this.addLayer(layer)));
    // this.unsubscribeLater(this.layerService.onLayerRemoved.subscribe((layer: BaseLayer) => this.removeLayer(layer)));
  }
}
