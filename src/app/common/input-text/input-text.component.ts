import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [
    FormsModule
],
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input()
  public title: string | undefined;

  @Input()
  public placeholder: string | undefined;

  @Input()
  public text: string = "";
  @Output()
  public textChange: EventEmitter<string> = new EventEmitter();

  public onTextChanged(newText: string): void {
    this.text = newText;
    this.textChange.emit(newText);
  }
}
