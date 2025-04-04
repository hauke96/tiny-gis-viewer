import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {Unsubscriber} from '../../../common/unsubscriber';
import {Layer} from '../../../layer/layer';
import {Feature} from 'ol';
import {FeatureSelectionMenuComponent} from '../feature-selection-menu/feature-selection-menu.component';
import {TranslatePipe} from '@ngx-translate/core';
import {FeatureSelectionService} from '../../../feature/feature-selection.service';
import {FeatureDetailsComponent} from '../feature-details/feature-details.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-selection-sidebar',
  imports: [
    LucideAngularModule,
    FeatureSelectionMenuComponent,
    TranslatePipe,
    FeatureDetailsComponent,
    IconButtonComponent,
    NgIf,
  ],
  templateUrl: './selection-sidebar.component.html',
  styleUrl: './selection-sidebar.component.scss'
})
export class SelectionSidebarComponent extends Unsubscriber {
  protected layerToFeaturesMap: Map<Layer, Feature[]> = new Map<Layer, Feature[]>();
  protected selectedFeaturesFromMap: Feature[] = [];

  constructor(private featureSelectionService: FeatureSelectionService) {
    super();

    this.unsubscribeLater(
      featureSelectionService.selectionOnMap
        .subscribe(layerToFeaturesMap => {
          this.layerToFeaturesMap = layerToFeaturesMap[1];
          this.selectedFeaturesFromMap = Array.from(this.layerToFeaturesMap.keys()).flatMap(key => this.layerToFeaturesMap.get(key) ?? []);
        })
    );
  }

  protected onCloseClicked(): void {
    this.featureSelectionService.deselectAllFeaturesOnMap();
  }

  protected onFeatureFromMenuSelected(feature: Feature): void {
    this.featureSelectionService.focusFeature(feature);
  }

  protected get focussedFeature(): Feature | undefined {
    return this.featureSelectionService.currentlyFocussedFeature;
  }

  public hasFocussedFeature():boolean {
    return !!this.focussedFeature;
  }
}
