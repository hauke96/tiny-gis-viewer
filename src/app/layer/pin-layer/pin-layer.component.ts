import {Component, OnInit} from '@angular/core';
import {Unsubscriber} from '../../common/unsubscriber';
import {MapService} from '../../map/map.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Feature} from 'ol';
import {Point} from 'ol/geom';

@Component({
  selector: 'app-pin-layer',
  imports: [],
  template: '',
})
export class PinLayerComponent extends Unsubscriber implements OnInit {

  private readonly source: VectorSource;
  private readonly layer: VectorLayer;

  constructor(private mapService: MapService) {
    super();

    this.source = new VectorSource();
    this.layer = new VectorLayer({
      zIndex: 10000,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          scale: 0.65,
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'pin.png',
        }),
      }),
      source: this.source
    })
    this.unsubscribeLater(
      this.mapService.clicked.subscribe(event => {
        this.source.clear();
        if(!!event && event.coordinate && event.coordinate.length > 0) {
          this.source.addFeature(new Feature(new Point(event.coordinate)));
        }
      })
    )
  }

  ngOnInit(): void {

    this.mapService.addLayer(this.layer);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.mapService.removeLayer(this.layer);
  }
}
