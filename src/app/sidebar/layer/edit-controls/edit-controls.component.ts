import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {NgIf} from '@angular/common';
import {InputTextComponent} from '../../../common/input-text/input-text.component';
import {IconTextButtonComponent} from '../../../common/icon-text-button/icon-text-button.component';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {CheckboxComponent} from '../../../common/checkbox/checkbox.component';

@Component({
  selector: 'app-edit-controls',
  imports: [
    LucideAngularModule,
    DialogComponent,
    NgIf,
    InputTextComponent,
    IconTextButtonComponent,
    IconButtonComponent,
    CheckboxComponent,
  ],
  templateUrl: './edit-controls.component.html',
  styleUrl: './edit-controls.component.scss'
})
export class EditControlsComponent {

  protected showDialog: boolean = false;

  public isQueryable: boolean = false;

  public onAddLayerClicked(): void {
    this.showDialog = true;
  }

  public onDialogClose(): void {
    this.showDialog = false;
  }
}
