import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {NgIf} from '@angular/common';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {WmsLayerCreationFormComponent} from '../../../layer/wms-layer-creation-form/wms-layer-creation-form.component';
import {LayerConfig} from '../../../config/config';
import {ConfigService} from '../../../config/config.service';

@Component({
  selector: 'app-edit-controls',
  imports: [
    LucideAngularModule,
    DialogComponent,
    NgIf,
    IconButtonComponent,
    WmsLayerCreationFormComponent,
  ],
  templateUrl: './edit-controls.component.html',
  styleUrl: './edit-controls.component.scss'
})
export class EditControlsComponent {

  protected showDialog: boolean = false;

  constructor(private configService: ConfigService) {
  }

  public onAddLayerClicked(): void {
    this.showDialog = true;
  }

  public onDialogClose(): void {
    this.showDialog = false;
  }

  public onWmsLayerSave(layer: LayerConfig): void {
    this.configService.addLayer(layer);
    this.onDialogClose();
  }

  public onWmsLayerAbort(): void {
    this.onDialogClose();
  }
}
