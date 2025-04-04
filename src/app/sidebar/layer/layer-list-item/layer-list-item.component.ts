import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Layer, WmsCapabilitiesLayer} from '../../../layer/layer';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {NgForOf, NgIf} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-layer-list-item',
  imports: [
    CheckboxComponent,
    IconButtonComponent,
    NgIf,
    TranslatePipe,
    NgForOf,
    LucideAngularModule
  ],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input()
  public layer!: Layer;
  @Input()
  public isLast: boolean = false;
  @Input()
  public hasControlButtons: boolean = true;

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

  public get hasSubLayers(): boolean {
    return this.subLayers().length > 0;
  }

  public subLayers(): Layer[] {
    return this.layer instanceof WmsCapabilitiesLayer ? this.layer.wmsLayers : [];
  }
}
