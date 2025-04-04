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
  public tooltipText: string | undefined;
  @Input()
  public fadeOnUnchecked: boolean = false;

  @Input()
  public checked: boolean = false;
  @Output()
  public checkedChange: EventEmitter<boolean> = new EventEmitter();

  protected onClick($event: MouseEvent) {
    this.checkedChange.emit(!this.checked);
    $event.stopPropagation();
  }
}
