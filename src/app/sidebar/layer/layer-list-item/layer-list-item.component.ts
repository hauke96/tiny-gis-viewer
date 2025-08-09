import {Component, Input} from '@angular/core';
import {Layer} from '../../../map/layer';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';

import {LucideAngularModule} from 'lucide-angular';
import {LayerService} from '../../../map/layer.service';

@Component({
  selector: 'app-layer-list-item',
  imports: [
    CheckboxComponent,
    IconButtonComponent,
    TranslatePipe,
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

  constructor(private translate: TranslateService, private layerService: LayerService) {
  }

  public getTooltipText(): string {
    return this.translate.instant("layer-list.layer-tooltip", {name: this.layer.title});
  }

  public onLayerSelectionClicked(layerVisible: boolean): void {
    this.layer.setVisible(layerVisible)
  }

  public onMoveDownClicked(): void {
    this.layerService.moveLayerDown(this.layer);
  }

  public onDeleteClicked(): void {
    this.layerService.deleteLayer(this.layer);
  }

  public get hasSubLayers(): boolean {
    return this.subLayers().length > 0;
  }

  public subLayers(): Layer[] {
    return this.layer.getSubLayers() ?? [];
  }
}
