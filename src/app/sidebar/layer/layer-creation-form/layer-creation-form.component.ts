import {Component, EventEmitter, Output} from '@angular/core';
import {CheckboxComponent} from "../../../common/checkbox/checkbox.component";
import {IconTextButtonComponent} from "../../../common/icon-text-button/icon-text-button.component";
import {InputTextComponent} from "../../../common/input-text/input-text.component";
import {LayerConfig, LayerType} from '../../../config/config';
import {DropDownComponent} from '../../../common/drop-down/drop-down.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-creation-form',
  imports: [
    CheckboxComponent,
    IconTextButtonComponent,
    InputTextComponent,
    DropDownComponent,
    TranslatePipe
  ],
  templateUrl: './layer-creation-form.component.html',
  styleUrl: './layer-creation-form.component.scss'
})
export class LayerCreationFormComponent {
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
  public initiallyVisible: boolean = false;

  constructor(translate: TranslateService) {
    this.layerTypeValues = [
      ["wms", translate.instant("layer-types.wms")],
      ["wms-capabilities", translate.instant("layer-types.wms-capabilities")],
      ["xyz", translate.instant("layer-types.xyz")],
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
      this.layerAttribution,
      this.initiallyVisible,
      undefined,
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
