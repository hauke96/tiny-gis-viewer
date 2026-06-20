import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import {IconButtonComponent} from '../../common/icon-button/icon-button.component';

@Component({
  selector: 'app-control-button',
  imports: [
    IconButtonComponent
  ],
  templateUrl: './control-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './control-button.component.scss'
})
export class ControlButtonComponent {
  @Input()
  public iconName: string = "";
  @Input()
  public active: boolean = false;

  @Output()
  public click: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.click.emit();
  }
}
