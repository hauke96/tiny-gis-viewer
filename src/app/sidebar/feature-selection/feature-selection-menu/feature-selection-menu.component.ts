import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Feature} from 'ol';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Layer, WmsLayer} from '../../../map/layer';
import {LucideAngularModule} from 'lucide-angular';
import {ActivatedRoute} from '@angular/router';
import {Unsubscriber} from '../../../common/unsubscriber';

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
export class FeatureSelectionMenuComponent extends Unsubscriber {
  protected _features: Map<Layer, Feature[]> = new Map<Layer, Feature[]>();
  @Input()
  public set features(layerToFeaturesMap: Map<Layer, Feature[]>) {
    this._features = layerToFeaturesMap;
    this.layers = Array.from(layerToFeaturesMap.keys());

    // Find feature from URL parameters in new data
    if (this.layers.length > 0) {
      const layerToSelectedFeaturesMap = this.layers
        .filter(layer => layer instanceof WmsLayer)
        .filter(layer => layer.name === this.urlSelectedFeatureLayerName)
        .map(layer => {
          return [
            layer,
            layerToFeaturesMap.get(layer)?.filter(feature => feature.getId() === this.urlSelectedFeatureId)
          ] as [Layer, Feature[] | undefined];
        })
        .filter(layerToSelectedFeaturesMap => !!layerToSelectedFeaturesMap[1] && layerToSelectedFeaturesMap[1]?.length > 0);

      if (layerToSelectedFeaturesMap && layerToSelectedFeaturesMap.length > 0) {
        this.onFeatureSelected(layerToSelectedFeaturesMap[0][0], layerToSelectedFeaturesMap[0][1]![0]);
      }
    }
  }

  public get features(): Map<Layer, Feature[]> {
    return this._features;
  }

  @Output()
  public featureSelected = new EventEmitter<[Layer, Feature]>();

  protected layers: Layer[] = [];
  protected selectedFeature: Feature | undefined = undefined;

  private urlSelectedFeatureId: string | undefined;
  private urlSelectedFeatureLayerName: string | undefined;

  constructor(
    private route: ActivatedRoute,
  ) {
    super();

    this.unsubscribeLater(
      this.route.queryParamMap.subscribe(paramMap => {
        if (paramMap.has("feature") && paramMap.get("feature")?.trim() !== "") {
          let [layerName, featureId] = JSON.parse(paramMap.get("feature")!) as [string, string];
          this.urlSelectedFeatureLayerName = layerName;
          this.urlSelectedFeatureId = featureId;
        } else {
          this.urlSelectedFeatureLayerName = undefined;
          this.urlSelectedFeatureId = undefined;
        }
      })
    )
  }

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

  public onFeatureSelected(layer: Layer, feature: Feature): void {
    this.selectedFeature = feature;
    this.featureSelected.emit([layer, this.selectedFeature]);
  }
}
