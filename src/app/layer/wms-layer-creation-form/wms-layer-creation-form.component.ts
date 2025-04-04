import {Component, EventEmitter, Output} from '@angular/core';
import {CheckboxComponent} from "../../common/checkbox/checkbox.component";
import {IconTextButtonComponent} from "../../common/icon-text-button/icon-text-button.component";
import {InputTextComponent} from "../../common/input-text/input-text.component";
import {LayerConfig, LayerType} from '../../config/config';
import {DropDownComponent} from '../../common/drop-down/drop-down.component';

@Component({
  selector: 'app-wms-layer-creation-form',
  imports: [
    CheckboxComponent,
    IconTextButtonComponent,
    InputTextComponent,
    DropDownComponent
  ],
  templateUrl: './wms-layer-creation-form.component.html',
  styleUrl: './wms-layer-creation-form.component.scss'
})
export class WmsLayerCreationFormComponent {
  @Output()
  public save: EventEmitter<LayerConfig> = new EventEmitter();
  @Output()
  public abort: EventEmitter<void> = new EventEmitter();

  public layerTypeValues: [LayerType, string][];
  public layerType: LayerType = 'wms';
  public layerTitle: string = "";
  public layerUrl: string = "";
  public layerName: string = "";
  public layerAttribution: string = "";
  public layerIsQueryable: boolean = false;

  constructor() {
    // TODO translate
    this.layerTypeValues = [
      ["wms", "WMS"],
      ["wms-capabilities", "WMS GetCapabilities"],
      ["xyz", "XYZ tiles"],
    ];
  }

  public onAbortClicked(): void {
    this.abort.emit();
  }

  public onSaveClicked(): void {
    this.save.emit(new LayerConfig(
      this.layerType!,
      this.layerUrl,
      this.layerTitle,
      this.layerName,
      this.layerIsQueryable,
      this.layerAttribution
    ));
  }

  public canSave(): boolean {
    return !!this.layerType &&
      !!this.layerTitle && this.layerTitle != "" &&
      !!this.layerUrl && this.layerUrl != "" &&
      !!this.layerName && this.layerName != "" &&
      !!this.layerAttribution && this.layerAttribution != "";
  }
}
