import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LayerService} from '../../layer/layer.service';
import {Unsubscriber} from '../../common/unsubscriber';
import {Layer} from '../../layer/layer';
import {Feature} from 'ol';

@Component({
  selector: 'app-selection-sidebar',
  imports: [
    LucideAngularModule,
  ],
  templateUrl: './selection-sidebar.component.html',
  styleUrl: './selection-sidebar.component.scss'
})
export class SelectionSidebarComponent extends Unsubscriber {
  protected layerToFeaturesMap: Map<Layer, Feature[]> = new Map<Layer, Feature[]>();

  constructor(private layerService: LayerService) {
    super();

    this.unsubscribeLater(layerService.selection.subscribe(layerToFeaturesMap => this.layerToFeaturesMap = layerToFeaturesMap));
  }

  onCloseClicked() {
    this.layerService.deselectAllFeatures();
  }
}
