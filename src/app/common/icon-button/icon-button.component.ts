import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-icon-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input()
  public iconName: string = "";
  @Input()
  public enabled: boolean = true;
  @Input()
  public round: boolean = false;
  @Input()
  public shadow: boolean = false;
  @Input()
  public active: boolean = false;

  @Output()
  public click: EventEmitter<void> = new EventEmitter();

  onClick($event: MouseEvent) {
    this.click.emit();
    $event.stopPropagation();
  }
}
