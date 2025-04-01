import {Unsubscriber} from '../../common/unsubscriber';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Draw, Modify} from 'ol/interaction';
import {Type} from 'ol/geom/Geometry';
import {FeatureLike} from 'ol/Feature';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';

@Component({
  template: ''
})
export abstract class AbstractMeasureComponent extends Unsubscriber implements OnInit, OnDestroy {

  protected readonly modifyStyle: Style = new Style({
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.4)',
      }),
    })
  });

  protected readonly pointCircleStyle: Style = new Style({
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  });

  protected readonly style: Style = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [5, 7],
      width: 2,
    }),
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
    }),
  });

  protected readonly labelStyle: Style = new Style({
    text: new Text({
      font: '14px Calibri,sans-serif',
      fill: new Fill({
        color: 'rgba(255, 255, 255, 1)',
      }),
      backgroundFill: new Fill({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
      padding: [3, 3, 3, 3],
      textBaseline: 'bottom',
      offsetY: -15,
    }),
    image: new RegularShape({
      radius: 8,
      points: 3,
      angle: Math.PI,
      displacement: [0, 10],
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.7)',
      }),
    }),
  });

  protected measureSource!: VectorSource;
  protected measureLayer!: VectorLayer;
  protected measureDrawInteraction!: Draw;
  protected measureModifyInteraction!: Modify;

  protected constructor(private mapService: MapService) {
    super();

    this.initMeasurement();
  }

  public ngOnInit(): void {
    this.measureModifyInteraction.setActive(false);
    this.mapService.addInteraction(this.measureModifyInteraction);

    this.measureDrawInteraction.setActive(false);
    this.mapService.addInteraction(this.measureDrawInteraction);

    this.mapService.addLayer(this.measureLayer);
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();

    this.mapService.removeInteraction(this.measureModifyInteraction);
    this.mapService.removeInteraction(this.measureDrawInteraction);
    this.mapService.removeLayer(this.measureLayer);
  }

  protected initMeasurement(): void {
    this.measureSource = new VectorSource();
    this.measureLayer = new VectorLayer({
      source: this.measureSource,
      style: (feature) => this.getStyle(feature),
      zIndex: 2000
    });

    this.measureModifyInteraction = new Modify({source: this.measureSource, style: this.modifyStyle});

    this.measureDrawInteraction = new Draw({
      source: this.measureSource,
      type: this.getGeometryType(),
      style: (feature) => {
        if (feature.getGeometry()) {
          if (feature.getGeometry()?.getType() === this.getGeometryType()) {
            return this.getStyle(feature);
          } else if (feature.getGeometry()?.getType() === 'Point') {
            return this.pointCircleStyle;
          }
        }
        return [];
      },
      stopClick: true,
    });
    this.measureDrawInteraction.on('drawstart', () => {
      this.measureSource.clear();
      this.measureModifyInteraction.setActive(false);
    });
    this.measureDrawInteraction.on("drawend", () => {
      this.measureModifyInteraction.setActive(true);
    });
  }

  protected abstract getStyle(feature: FeatureLike): Style[];

  protected abstract getGeometryType(): Type

  public startMeasurement(): void {
    this.measureDrawInteraction.setActive(true);
  }

  public endMeasurement(): void {
    this.measureDrawInteraction.setActive(false);
    this.measureSource.clear();
  }
}
