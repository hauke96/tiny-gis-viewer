import {Component, Input} from '@angular/core';
import {LayerService} from '../../../layer/layer.service';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Layer} from '../../../layer/layer';

@Component({
  selector: 'app-layer-list',
  imports: [
    CheckboxComponent,
    NgForOf,
    AsyncPipe,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './layer-list.component.html',
  styleUrl: './layer-list.component.scss'
})
export class LayerListComponent {
  @Input() expanded!: boolean;

  constructor(protected layerService: LayerService, private translate: TranslateService) {
  }

  getTooltipText(layer: Layer): string {
    return this.translate.instant("wms-layer-tooltip", {name: layer.title});
  }

  onLayerSelectionClicked(layer: Layer, layerVisible: boolean) {
    layer.setVisible(layerVisible);
  }
}
