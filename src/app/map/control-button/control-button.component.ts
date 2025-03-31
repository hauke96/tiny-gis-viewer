import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-control-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './control-button.component.html',
  styleUrl: './control-button.component.scss'
})
export class ControlButtonComponent {
  @Input()
  public iconName: string = "";

  @Output()
  public click: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.click.emit();
  }
}
