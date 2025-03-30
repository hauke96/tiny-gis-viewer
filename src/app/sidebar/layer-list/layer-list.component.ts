import {Component} from '@angular/core';
import {LayerService} from '../../layer/layer.service';
import {LayerListItemComponent} from '../layer-list-item/layer-list-item.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-layer-list',
  imports: [
    LayerListItemComponent,
    NgForOf,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './layer-list.component.html',
  styleUrl: './layer-list.component.scss'
})
export class LayerListComponent {
  constructor(public layerService: LayerService) {
  }
}
