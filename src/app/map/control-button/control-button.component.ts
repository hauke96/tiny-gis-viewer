import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {IconButtonComponent} from '../../common/icon-button/icon-button.component';

@Component({
  selector: 'app-control-button',
  imports: [
    LucideAngularModule,
    IconButtonComponent
  ],
  templateUrl: './control-button.component.html',
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
