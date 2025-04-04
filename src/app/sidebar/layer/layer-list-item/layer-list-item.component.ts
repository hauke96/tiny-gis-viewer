import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Layer} from '../../../layer/layer';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-list-item',
  imports: [],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input()
  public title:string="";
  @Input()
  public checked:boolean=false;
  @Input()
  public tooltipText:string|undefined;

  @Output()
  public click: EventEmitter<boolean> = new EventEmitter();

  protected onClick($event: MouseEvent) {
    this.click.emit(!this.checked);
    $event.stopPropagation();
  }
}
