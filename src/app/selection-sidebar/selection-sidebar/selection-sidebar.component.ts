import {Component} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-selection-sidebar',
  imports: [
    LucideAngularModule,
    NgIf
  ],
  templateUrl: './selection-sidebar.component.html',
  styleUrl: './selection-sidebar.component.scss'
})
export class SelectionSidebarComponent {
  // TODO react to changed feature selection

  onCloseClicked() {
    // TODO deselect all features
  }
}
