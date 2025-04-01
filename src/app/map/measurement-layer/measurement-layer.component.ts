import {Component, OnDestroy, OnInit} from '@angular/core';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {Draw, Modify} from 'ol/interaction';
import {FeatureLike} from 'ol/Feature';
import {LineString, Point, Polygon} from 'ol/geom';
import {getArea, getLength} from 'ol/sphere';
import {MapService} from '../map.service';
import {Unsubscriber} from '../../common/unsubscriber';

@Component({
  selector: 'app-measurement-layer',
  imports: [],
  template: '',
})
export class MeasurementLayerComponent extends Unsubscriber implements OnInit, OnDestroy {

  private measureLengthSource!: VectorSource;
  private measureLengthLayer!: VectorLayer;
  private measureLengthDrawInteraction!: Draw;
  private measureLengthModifyInteraction!: Modify;

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

  private readonly segmentStyle: Style = new Style({
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({
        color: 'rgba(255, 255, 255, 1)',
      }),
      backgroundFill: new Fill({
        color: 'rgba(0, 0, 0, 0.4)',
      }),
      padding: [2, 2, 2, 2],
      textBaseline: 'bottom',
      offsetY: -12,
    }),
    image: new RegularShape({
      radius: 6,
      points: 3,
      angle: Math.PI,
      displacement: [0, 8],
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.4)',
      }),
    }),
  });

  constructor(private mapService: MapService) {
    super();

    this.initLengthMeasurement();
  }

  public ngOnInit(): void {
    this.measureLengthModifyInteraction.setActive(false);
    this.mapService.addInteraction(this.measureLengthModifyInteraction);

    this.measureLengthDrawInteraction.setActive(false);
    this.mapService.addInteraction(this.measureLengthDrawInteraction);

    this.mapService.addLayer(this.measureLengthLayer);

    this.unsubscribeLater(
      this.mapService.lengthMeasurementStarted.subscribe(() => this.startLengthMeasurement()),
      this.mapService.lengthMeasurementEnded.subscribe(() => this.endLengthMeasurement()),
    );
  }

  public override ngOnDestroy() {
    super.ngOnDestroy();

    this.mapService.removeInteraction(this.measureLengthModifyInteraction);
    this.mapService.removeInteraction(this.measureLengthDrawInteraction);
    this.mapService.removeLayer(this.measureLengthLayer);
  }

  public startLengthMeasurement(): void {
    this.measureLengthDrawInteraction.setActive(true);
  }

  public endLengthMeasurement(): void {
    this.measureLengthDrawInteraction.setActive(false);
    this.measureLengthSource.clear();
  }

  private initLengthMeasurement() {
    this.measureLengthSource = new VectorSource();
    this.measureLengthLayer = new VectorLayer({
      source: this.measureLengthSource,
      style: (feature) => this.getLineStyle(feature),
      zIndex: 2000
    });

    this.measureLengthModifyInteraction = new Modify({source: this.measureLengthSource, style: this.modifyStyle});

    this.measureLengthDrawInteraction = new Draw({
      source: this.measureLengthSource,
      type: "LineString",
      style: (feature) => {
        if (feature.getGeometry()) {
          if (feature.getGeometry()?.getType() === 'LineString') {
            return this.getLineStyle(feature);
          } else if (feature.getGeometry()?.getType() === 'Point') {
            return this.pointCircleStyle;
          }
        }
        return [];
      },
      stopClick: true,
    });
    this.measureLengthDrawInteraction.on('drawstart', () => {
      this.measureLengthSource.clear();
      this.measureLengthModifyInteraction.setActive(false);
    });
    this.measureLengthDrawInteraction.on("drawend", () => {
      this.measureLengthModifyInteraction.setActive(true);
    });
  }

  private getLineStyle(feature: FeatureLike): Style[] {
    // For polygons:
    // let polygonGeom = geometry as Polygon;
    // point = polygonGeom.getInteriorPoint();
    // label = this.formatArea(polygonGeom);
    // line = new LineString(polygonGeom.getCoordinates()[0]);

    const lineString = feature.getGeometry() as LineString;
    if (!lineString || lineString.getCoordinates().length === 0) {
      return [];
    }

    const styles = [this.style, this.segmentStyle];
    const point = new Point(lineString.getLastCoordinate());
    const label = this.formatLength(lineString);

    lineString.forEachSegment((a, b) => {
      const segment = new LineString([a, b]);
      const segmentMidPoint = new Point(segment.getCoordinateAt(0.5));
      const label = this.formatLength(segment);

      let segmentStyle = this.segmentStyle.clone();
      segmentStyle.setGeometry(segmentMidPoint);
      segmentStyle.getText()?.setText(label);

      styles.push(segmentStyle);
    });

    if (label && point) {
      this.labelStyle.setGeometry(point);
      this.labelStyle.getText()?.setText(label);
      styles.push(this.labelStyle);
    }

    return styles;
  }

  private formatLength(line: LineString): string {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' km';
    } else {
      output = Math.round(length * 100) / 100 + ' m';
    }
    return output;
  };

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
