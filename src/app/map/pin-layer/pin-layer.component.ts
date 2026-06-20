import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MapService} from '../map.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pin-layer',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export class PinLayerComponent implements OnInit {

  private readonly source: VectorSource;
  private readonly layer: VectorLayer;

  constructor(private mapService: MapService) {
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

    this.mapService.clicked.pipe(takeUntilDestroyed()).subscribe(event => {
      this.source.clear();
      if (!!event && event.coordinate && event.coordinate.length > 0) {
        this.source.addFeature(new Feature(new Point(event.coordinate)));
      }
    });
  }

  ngOnInit(): void {
    this.mapService.addLayer(this.layer);
  }

  ngOnDestroy() {
    this.mapService.removeLayer(this.layer);
  }
}
