import {Component, EventEmitter, Output} from '@angular/core';
import {CheckboxComponent} from "../../common/checkbox/checkbox.component";
import {IconTextButtonComponent} from "../../common/icon-text-button/icon-text-button.component";
import {InputTextComponent} from "../../common/input-text/input-text.component";
import {WmsLayer} from '../layer';

@Component({
  selector: 'app-wms-layer-creation-form',
  imports: [
    CheckboxComponent,
    IconTextButtonComponent,
    InputTextComponent
  ],
  templateUrl: './wms-layer-creation-form.component.html',
  styleUrl: './wms-layer-creation-form.component.scss'
})
export class WmsLayerCreationFormComponent {
  @Output()
  public save: EventEmitter<WmsLayer> = new EventEmitter();
  @Output()
  public abort: EventEmitter<void> = new EventEmitter();

  public layerTitle: string = "";
  public layerUrl: string = "";
  public layerName: string = "";
  public layerAttribution: string = "";
  public layerIsQueryable: boolean = false;

  public onAbortClicked(): void {
    this.abort.emit();
  }

  public onSaveClicked(): void {
    this.save.emit(new WmsLayer(
      this.layerTitle,
      this.layerUrl,
      this.layerName,
      this.layerIsQueryable,
      this.layerAttribution
    ));
  }

  public canSave(): boolean {
    return !!this.layerTitle && this.layerTitle != "" &&
      !!this.layerUrl && this.layerUrl != "" &&
      !!this.layerName && this.layerName != "" &&
      !!this.layerAttribution && this.layerAttribution != "";
  }
}
