import {Component} from '@angular/core';
import {Style} from 'ol/style';
import {FeatureLike} from 'ol/Feature';
import {Polygon} from 'ol/geom';
import {getArea} from 'ol/sphere';
import {MapService} from '../../map/map.service';
import {AbstractMeasureComponent} from './measure-common';
import {Type} from 'ol/geom/Geometry';

@Component({
  selector: 'app-measure-area-layer',
  imports: [],
  template: '',
})
export class MeasureAreaLayerComponent extends AbstractMeasureComponent {

  constructor(mapService: MapService) {
    super(mapService);

    this.unsubscribeLater(
      mapService.areaMeasurementStarted.subscribe(() => this.startMeasurement()),
      mapService.areaMeasurementEnded.subscribe(() => this.endMeasurement()),
    );
  }

  protected override getStyle(feature: FeatureLike): Style[] {
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

  protected override getGeometryType(): Type {
    return 'Polygon';
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
