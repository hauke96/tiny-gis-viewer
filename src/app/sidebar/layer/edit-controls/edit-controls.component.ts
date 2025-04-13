import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {NgIf} from '@angular/common';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {LayerCreationFormComponent} from '../layer-creation-form/layer-creation-form.component';
import {LayerConfig} from '../../../config/config';
import {ConfigService} from '../../../config/config.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-controls',
  imports: [
    LucideAngularModule,
    DialogComponent,
    NgIf,
    IconButtonComponent,
    LayerCreationFormComponent,
    TranslatePipe,
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

  public async onDownloadClicked(): Promise<void> {
    const configString = this.configService.getConfigAsJson();

    // @ts-ignore
    if (window.showSaveFilePicker) {
      // @ts-ignore
      const handle = await showSaveFilePicker();
      const writable = await handle.createWritable();
      await writable.write(configString);
      writable.close();
    } else {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.configService.getConfigAsJson()));
      element.setAttribute('download', 'tgv-config.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  }

  public onUploadClicked(): void {
    document.getElementById('config-input')?.click();
  }

  public onConfigUpload($event: Event) {
    this.uploadFile($event, (evt) => {
      if (!evt || !evt.target) {
        return;
      }

      // @ts-ignore
      this.configService.loadConfigFromJson(evt.target.result);
    });
  }

  private uploadFile(event: any, loadHandler: (evt: Event) => void): void {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsText(file, 'UTF-8');

    reader.onload = loadHandler;
    reader.onerror = (evt) => {
      console.error(evt);
    };
  }

  public onShareClicked(): void {
    this.configService.storeConfigInUrl();
    navigator.clipboard.writeText(window.location.href);
  }
}
