import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input()
  public title: string = "";
  @Input()
  public checked: boolean = false;
  @Input()
  public tooltipText: string | undefined;

  @Output()
  public click: EventEmitter<boolean> = new EventEmitter();

  protected onClick($event: MouseEvent) {
    this.click.emit(!this.checked);
    $event.stopPropagation();
  }
}
