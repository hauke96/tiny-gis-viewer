import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Feature} from 'ol';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-feature-selection-menu',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './feature-selection-menu.component.html',
  styleUrl: './feature-selection-menu.component.scss'
})
export class FeatureSelectionMenuComponent {
  public _features: Feature[] = [];
  @Input()
  public set features(features: Feature[]) {
    this._features = features;
    this.selectedFeature = features[0];
    this.onFeatureSelected();
  }
  public get features(): Feature[] {
    return this._features;
  }

  @Output()
  public featureSelected = new EventEmitter<Feature>();

  protected selectedFeature: Feature | undefined = undefined;

  getNameForFeature(feature: Feature): string {
    let properties = feature.getProperties();
    if (properties["name"]) {
      return properties["name"];
    }
    if (properties["id"]) {
      return properties["id"];
    }

    // TODO translate
    return "<unknown>";
  }

  onFeatureSelected() {
    this.featureSelected.emit(this.selectedFeature);
  }
}
