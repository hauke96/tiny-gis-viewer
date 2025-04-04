import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Layer} from '../../../layer/layer';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layer-list-item',
  imports: [
    CheckboxComponent,
    IconButtonComponent,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input()
  public layer!: Layer;
  @Input()
  public isLast: boolean = false;

  @Output()
  public moveDown: EventEmitter<void> = new EventEmitter();
  @Output()
  public delete: EventEmitter<void> = new EventEmitter();

  constructor(private translate: TranslateService) {
  }

  public getTooltipText(layer: Layer): string {
    return this.translate.instant("layer-list.layer-tooltip", {name: layer.title});
  }

  public onLayerSelectionClicked(layer: Layer, layerVisible: boolean): void {
    layer.setVisible(layerVisible);
  }

  public onMoveDownClicked(): void {
    this.moveDown.emit();
  }

  public onDeleteClicked(): void {
    this.delete.emit();
  }
}
