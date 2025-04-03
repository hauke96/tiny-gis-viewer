import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-dialog',
  imports: [
    LucideAngularModule
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
