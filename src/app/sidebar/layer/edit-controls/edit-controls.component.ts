import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {NgIf} from '@angular/common';
import {InputTextComponent} from '../../../common/input-text/input-text.component';

@Component({
  selector: 'app-edit-controls',
  imports: [
    LucideAngularModule,
    DialogComponent,
    NgIf,
    InputTextComponent,
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
}
