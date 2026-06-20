import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {IconButtonComponent} from '../icon-button/icon-button.component';

@Component({
  selector: 'app-dialog',
  imports: [
    IconButtonComponent
  ],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
