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
  @Input()
  public features: Feature[] = [];

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
