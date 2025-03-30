import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {Feature} from 'ol';

@Component({
  selector: 'app-feature-details',
  imports: [
    TranslatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // Performance enhancement to not render the table over and over again
})
export class FeatureDetailsComponent {
  protected _selectedFeature: Feature | undefined;

  @Input()
  public set selectedFeature(feature: Feature | undefined) {
    this._selectedFeature = feature;
    this.relevantTags = this.getRelevantTags(feature);
    this.changeDetectorRef.markForCheck();
  }

  private readonly irrelevantKeys = ['@id', '@type', '@timestamp', 'geometry'];
  protected relevantTags: [string, string][] = [];

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
}
