import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {IconButtonComponent} from '../icon-button/icon-button.component';

@Component({
  selector: 'app-dialog',
  imports: [
    LucideAngularModule,
    IconButtonComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  @Input()
  public title: string = "";

  @Output()
  public close: EventEmitter<void> = new EventEmitter();

  public onCloseClicked(): void {
    this.close.emit();
  }
}
