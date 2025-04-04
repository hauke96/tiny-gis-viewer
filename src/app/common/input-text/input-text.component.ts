import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './input-text.component.html',
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
