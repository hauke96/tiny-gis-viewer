import {Component, Input} from '@angular/core';
import {Layer} from '../../../layer/layer';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-list-item',
  imports: [],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input() layer!: Layer;

  constructor(private translate: TranslateService) {
  }

  protected onClick(layerVisible: boolean) {
    this.layer.setVisible(layerVisible);
  }

  protected get tooltipText(): string {
    return this.translate.instant('wms-layer-tooltip', {name: this.layer.title});
  }
}
