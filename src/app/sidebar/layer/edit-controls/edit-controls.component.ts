import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {NgIf} from '@angular/common';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {WmsLayerCreationFormComponent} from '../../../layer/wms-layer-creation-form/wms-layer-creation-form.component';
import {WmsLayer} from '../../../layer/layer';

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

  public onAddLayerClicked(): void {
    this.showDialog = true;
  }

  public onDialogClose(): void {
    this.showDialog = false;
  }

  public onWmsLayerSave(layer: WmsLayer): void {
    console.log(layer);
  }

  public onWmsLayerAbort(): void {
    this.onDialogClose();
  }
}
