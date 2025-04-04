import {Component, Input} from '@angular/core';
import {Layer} from '../../../layer/layer';
import {TranslateService} from '@ngx-translate/core';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layer-list-item',
  imports: [
    CheckboxComponent,
    IconButtonComponent,
    NgIf
  ],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input()
  public layer!: Layer;
  @Input()
  public isLast: boolean = false;

  constructor(private translate: TranslateService) {
  }

  getTooltipText(layer: Layer): string {
    return this.translate.instant("layer-tooltip", {name: layer.title});
  }

  onLayerSelectionClicked(layer: Layer, layerVisible: boolean) {
    layer.setVisible(layerVisible);
  }
}
