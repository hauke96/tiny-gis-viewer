import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-drop-down',
  imports: [
    FormsModule
],
  templateUrl: './drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  @Input()
  public title: string | undefined;
  @Input()
  public values: [any, string][] = [];

  @Input()
  public value: any;
  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter();

  public onValueSelected(selectedValue: any): void {
    this.valueChange.emit(selectedValue);
  }
}
