import {Component, OnDestroy, OnInit} from '@angular/core';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {Draw, Modify} from 'ol/interaction';
import {FeatureLike} from 'ol/Feature';
import {Polygon} from 'ol/geom';
import {getArea} from 'ol/sphere';
import {MapService} from '../map.service';
import {Unsubscriber} from '../../common/unsubscriber';

@Component({
  selector: 'app-measure-area-layer',
  imports: [],
  template: '',
})
export class MeasureAreaLayerComponent extends Unsubscriber implements OnInit, OnDestroy {

  private measureAreaSource!: VectorSource;
  private measureAreaLayer!: VectorLayer;
  private measureAreaDrawInteraction!: Draw;
  private measureAreaModifyInteraction!: Modify;

  private readonly modifyStyle: Style = new Style({
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

  private readonly style: Style = new Style({
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

  private readonly pointCircleStyle: Style = new Style({
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

  private readonly labelStyle: Style = new Style({
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

  constructor(private mapService: MapService) {
    super();

    this.initMeasurement();
  }

  public ngOnInit(): void {
    this.measureAreaModifyInteraction.setActive(false);
    this.mapService.addInteraction(this.measureAreaModifyInteraction);

    this.measureAreaDrawInteraction.setActive(false);
    this.mapService.addInteraction(this.measureAreaDrawInteraction);

    this.mapService.addLayer(this.measureAreaLayer);

    this.unsubscribeLater(
      this.mapService.areaMeasurementStarted.subscribe(() => this.startMeasurement()),
      this.mapService.areaMeasurementEnded.subscribe(() => this.endMeasurement()),
    );
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();

    this.mapService.removeInteraction(this.measureAreaModifyInteraction);
    this.mapService.removeInteraction(this.measureAreaDrawInteraction);
    this.mapService.removeLayer(this.measureAreaLayer);
  }

  public startMeasurement(): void {
    this.measureAreaDrawInteraction.setActive(true);
  }

  public endMeasurement(): void {
    this.measureAreaDrawInteraction.setActive(false);
    this.measureAreaSource.clear();
  }

  private initMeasurement() {
    this.measureAreaSource = new VectorSource();
    this.measureAreaLayer = new VectorLayer({
      source: this.measureAreaSource,
      style: (feature) => this.getPolygonStyle(feature),
      zIndex: 2000
    });

    this.measureAreaModifyInteraction = new Modify({source: this.measureAreaSource, style: this.modifyStyle});

    this.measureAreaDrawInteraction = new Draw({
      source: this.measureAreaSource,
      type: "Polygon",
      style: (feature) => {
        if (feature.getGeometry()) {
          if (feature.getGeometry()?.getType() === 'Polygon') {
            return this.getPolygonStyle(feature);
          } else if (feature.getGeometry()?.getType() === 'Point') {
            return this.pointCircleStyle;
          }
        }
        return [];
      },
      stopClick: true,
    });
    this.measureAreaDrawInteraction.on('drawstart', () => {
      this.measureAreaSource.clear();
      this.measureAreaModifyInteraction.setActive(false);
    });
    this.measureAreaDrawInteraction.on("drawend", () => {
      this.measureAreaModifyInteraction.setActive(true);
    });
  }

  private getPolygonStyle(feature: FeatureLike): Style[] {
    const polygon = feature.getGeometry() as Polygon;
    if (!polygon || polygon.getCoordinates().length === 0) {
      return [];
    }

    const styles = [this.style];
    const point = polygon.getInteriorPoint();
    const label = this.formatArea(polygon);

    if (label && point) {
      this.labelStyle.setGeometry(point);
      this.labelStyle.getText()?.setText(label);
      styles.push(this.labelStyle);
    }

    return styles;
  }

  private formatArea(polygon: Polygon): string {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
    } else {
      output = Math.round(area * 100) / 100 + ' m\xB2';
    }
    return output;
  };
}
