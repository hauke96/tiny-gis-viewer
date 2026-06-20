import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {Layer} from '../../../map/layer';
import {Feature} from 'ol';
import {FeatureSelectionMenuComponent} from '../feature-selection-menu/feature-selection-menu.component';
import {TranslatePipe} from '@ngx-translate/core';
import {FeatureSelectionService} from '../../../map/feature-selection.service';
import {FeatureDetailsComponent} from '../feature-details/feature-details.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';

import {MapService} from '../../../map/map.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-selection-view',
  imports: [
    LucideAngularModule,
    FeatureSelectionMenuComponent,
    TranslatePipe,
    FeatureDetailsComponent,
    IconButtonComponent
  ],
  templateUrl: './selection-view.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './selection-view.component.scss'
})
export class SelectionViewComponent {
  protected layerToFeaturesMap: Map<Layer, Feature[]> = new Map<Layer, Feature[]>();
  protected selectedFeaturesFromMap: Feature[] = [];

  constructor(private featureSelectionService: FeatureSelectionService, private mapService: MapService) {
    featureSelectionService.selectionOnMap
      .pipe(takeUntilDestroyed())
      .subscribe(layerToFeaturesMap => {
        this.layerToFeaturesMap = layerToFeaturesMap[1];
        this.selectedFeaturesFromMap = Array.from(this.layerToFeaturesMap.keys()).flatMap(key => this.layerToFeaturesMap.get(key) ?? []);
      });
  }

  ngOnDestroy() {
    this.featureSelectionService.deselectAllFeaturesOnMap();
    this.featureSelectionService.unfocusFeature();
  }

  protected onCloseClicked(): void {
    this.featureSelectionService.deselectAllFeaturesOnMap();
    this.featureSelectionService.unfocusFeature()
      .subscribe(() => this.mapService.resetClick());
  }

  protected onFeatureFromMenuSelected(eventData: [Layer, Feature]): void {
    this.featureSelectionService.focusFeature(eventData[0], eventData[1]);
  }

  protected get focussedFeature(): Feature | undefined {
    return this.featureSelectionService.currentlyFocussedFeature;
  }

  public hasFocussedFeature(): boolean {
    return !!this.focussedFeature;
  }
}
