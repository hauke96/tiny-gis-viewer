import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-edit-controls',
  imports: [
    LucideAngularModule,
  ],
  templateUrl: './edit-controls.component.html',
  styleUrl: './edit-controls.component.scss'
})
export class EditControlsComponent {

  public onAddLayerClicked(): void {
  }
}
