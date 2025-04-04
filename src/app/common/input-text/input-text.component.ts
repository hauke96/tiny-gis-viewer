import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-input-text',
  imports: [
    NgIf
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input()
  public title: string | undefined;

  @Input()
  public placeholder: string | undefined;
}
