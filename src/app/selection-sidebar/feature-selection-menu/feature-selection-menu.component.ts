import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Feature} from 'ol';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Layer} from '../../layer/layer';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-feature-selection-menu',
  imports: [
    NgForOf,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './feature-selection-menu.component.html',
  styleUrl: './feature-selection-menu.component.scss'
})
export class FeatureSelectionMenuComponent {
  protected _features: Map<Layer, Feature[]> = new Map<Layer, Feature[]>();
  @Input()
  public set features(features: Map<Layer, Feature[]>) {
    this._features = features;
    this.layers = Array.from(features.keys());
    if (this.layers.length > 0 && this._features.get(this.layers[0])) {
      this.onFeatureSelected(this._features.get(this.layers[0])![0]);
    }
  }

  public get features(): Map<Layer, Feature[]> {
    return this._features;
  }

  @Output()
  public featureSelected = new EventEmitter<Feature>();

  protected layers: Layer[] = [];
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

  public onFeatureSelected(feature: Feature): void {
    this.selectedFeature = feature;
    this.featureSelected.emit(this.selectedFeature);
  }
}
