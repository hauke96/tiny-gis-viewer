import {Component, Input} from '@angular/core';
import {Layer} from '../../layer/layer';

@Component({
  selector: 'app-layer-list-item',
  imports: [],
  templateUrl: './layer-list-item.component.html',
  styleUrl: './layer-list-item.component.scss'
})
export class LayerListItemComponent {
  @Input() layer!: Layer;

  onCheckboxClicked(event: Event) {
    this.layer.setVisible((event.target as HTMLInputElement).checked);
  }
}
