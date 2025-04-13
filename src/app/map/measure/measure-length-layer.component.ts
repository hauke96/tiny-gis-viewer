import {Component} from '@angular/core';
import {Fill, RegularShape, Style, Text} from 'ol/style';
import {FeatureLike} from 'ol/Feature';
import {LineString, Point} from 'ol/geom';
import {getLength} from 'ol/sphere';
import {MapService} from '../map.service';
import {AbstractMeasureComponent} from './measure-common';
import {Type} from 'ol/geom/Geometry';

@Component({
  selector: 'app-measure-length-layer',
  imports: [],
  template: '',
})
export class MeasureLengthLayerComponent extends AbstractMeasureComponent {

  private readonly segmentStyle: Style = new Style({
    text: new Text({
      font: '0.8rem DejaVu Sans, sans-serif',
      fill: new Fill({
        color: this.white,
      }),
      backgroundFill: new Fill({
        color: this.midSlightlyTransparentGrey,
      }),
      padding: [2, 2, 2, 2],
      textBaseline: 'bottom',
    }),
  });

  constructor(mapService: MapService) {
    super(mapService);

    this.unsubscribeLater(
      mapService.lengthMeasurementStarted.subscribe(() => this.startMeasurement()),
      mapService.lengthMeasurementEnded.subscribe(() => this.endMeasurement()),
    );
  }

  protected override getStyle(feature: FeatureLike): Style[] {
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

  protected override getGeometryType(): Type {
    return 'LineString';
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
}
