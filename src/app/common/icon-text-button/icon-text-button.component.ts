import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-icon-text-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './icon-text-button.component.html',
  styleUrl: './icon-text-button.component.scss'
})
export class IconTextButtonComponent {
  @Input()
  public iconName: string = "";
  @Input()
  public enabled: boolean = true;
  @Input()
  public shadow: boolean = false;
  @Input()
  public active: boolean = false;
  @Input()
  public text: string = "";

  @Output()
  public click: EventEmitter<void> = new EventEmitter();

  onClick($event: MouseEvent) {
    this.click.emit();
    $event.stopPropagation();
  }
}
