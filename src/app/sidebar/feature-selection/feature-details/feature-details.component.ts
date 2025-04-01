import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Feature} from 'ol';
import {Geometry, GeometryCollection, MultiLineString, MultiPoint, MultiPolygon} from 'ol/geom';
import {getArea, getLength} from 'ol/sphere';

@Component({
  selector: 'app-feature-details',
  imports: [
    TranslatePipe,
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Performance enhancement to not render the table over and over again
})
export class FeatureDetailsComponent {
  private readonly irrelevantKeys = ['@id', '@type', '@timestamp', 'geometry'];

  protected relevantTags: [string, string][] = [];
  protected areaSizeInM2: number | undefined = undefined;
  protected lineLengthInM: number | undefined = undefined;
  protected geometryType: string | undefined = undefined;
  protected numberOfGeometries: number | undefined = undefined;

  @Input()
  public set selectedFeature(feature: Feature | undefined) {
    this.relevantTags = this.getRelevantTags(feature);
    this.areaSizeInM2 = this.getAreaInM2(feature?.getGeometry());
    this.lineLengthInM = this.getLengthInM(feature?.getGeometry());
    this.geometryType = feature?.getGeometry()?.getType();
    this.numberOfGeometries = this.getNumberOfGeometries(feature?.getGeometry());

    this.changeDetectorRef.markForCheck();
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  getRelevantTags(feature: Feature | undefined): [string, string][] {
    if (!feature) {
      return [];
    }

    return Object.entries(feature.getProperties()).filter(t => !this.irrelevantKeys.includes(t[0]));
  }

  isUrl(value: string): boolean {
    let url;

    try {
      url = new URL(value);
    } catch {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  private getAreaInM2(geometry: Geometry | undefined): number | undefined {
    if (!geometry) {
      return undefined;
    }

    const areaInM2 = getArea(geometry)
    return areaInM2 == 0 ? undefined : areaInM2;
  }

  private getLengthInM(geometry: Geometry | undefined): number | undefined {
    if (!geometry) {
      return undefined;
    }
    const lengthInM = getLength(geometry);
    return lengthInM == 0 ? undefined : lengthInM;
  }

  private getNumberOfGeometries(geometry: Geometry | undefined): number {
    let numberOfGeometries = geometry ? 1 : 0;
    switch (geometry?.getType()) {
      case 'GeometryCollection':
        numberOfGeometries = (geometry as GeometryCollection).getGeometries()
          .map(g => this.getNumberOfGeometries(g))
          .reduce((a, b) => a + b);
        break
      case 'MultiPoint':
        numberOfGeometries = (geometry as MultiPoint).getPoints().length;
        break
      case 'MultiLineString':
        numberOfGeometries = (geometry as MultiLineString).getLineStrings().length;
        break
      case 'MultiPolygon':
        numberOfGeometries = (geometry as MultiPolygon).getPolygons().length;
        break
    }

    return numberOfGeometries;
  }
}
