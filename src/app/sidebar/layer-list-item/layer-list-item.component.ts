import {Component, Input} from '@angular/core';
import {Layer} from '../../layer/layer';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-list-item',
  imports: [
    TranslatePipe
  ],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input() layer!: Layer;

  constructor(private translate: TranslateService) {
  }

  public onCheckboxClicked(event: Event) {
    this.layer.setVisible((event.target as HTMLInputElement).checked);
  }

  public get tooltipText(): string {
    return this.translate.instant('wms-layer-tooltip', {name: this.layer.name});
  }
}
