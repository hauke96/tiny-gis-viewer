import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LayerService} from '../../layer/layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer} from '../../layer/layer';
import {Feature} from 'ol';
import {FeatureSelectionMenuComponent} from '../feature-selection-menu/feature-selection-menu.component';
import {TranslatePipe} from '@ngx-translate/core';
import {FeatureSelectionService} from '../../feature/feature-selection.service';

@Component({
  selector: 'app-selection-sidebar',
  imports: [
    LucideAngularModule,
    FeatureSelectionMenuComponent,
    TranslatePipe,
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
      featureSelectionService.selection
        .subscribe(layerToFeaturesMap => {
          this.layerToFeaturesMap = layerToFeaturesMap;
          this.selectedFeaturesFromMap = Array.from(this.layerToFeaturesMap.keys()).flatMap(key => this.layerToFeaturesMap.get(key) ?? []);
        })
    );
  }

  protected onCloseClicked(): void {
    this.featureSelectionService.deselectAllFeatures();
  }

  protected onFeatureFromMenuSelected(feature: Feature): void {

  }
}
