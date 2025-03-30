import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LayerService} from '../../layer/layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer} from '../../layer/layer';
import {Feature} from 'ol';
import {FeatureSelectionMenuComponent} from '../feature-selection-menu/feature-selection-menu.component';
import {TranslatePipe} from '@ngx-translate/core';

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
  protected selectedFeatures: Feature[] = [];

  constructor(private layerService: LayerService) {
    super();

    this.unsubscribeLater(
      layerService.selection
        .subscribe(layerToFeaturesMap => {
          this.layerToFeaturesMap = layerToFeaturesMap;
          this.selectedFeatures = Array.from(this.layerToFeaturesMap.keys()).flatMap(key => this.layerToFeaturesMap.get(key) ?? []);
          console.log(this.selectedFeatures);
        })
    );
  }

  protected onCloseClicked(): void {
    this.layerService.deselectAllFeatures();
  }
}
