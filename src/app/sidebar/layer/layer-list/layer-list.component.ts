import {Component, Input} from '@angular/core';
import {LayerService} from '../../../map/layer.service';
import { AsyncPipe } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Layer} from '../../../map/layer';
import {Observable} from 'rxjs';
import {LayerListItemComponent} from '../layer-list-item/layer-list-item.component';
import {ConfigService} from '../../../config/config.service';

@Component({
  selector: 'app-layer-list',
  imports: [
    AsyncPipe,
    TranslatePipe,
    LayerListItemComponent
],
  templateUrl: './layer-list.component.html',
  styleUrl: './layer-list.component.scss'
})
export class LayerListComponent {
  @Input() expanded!: boolean;

  constructor(protected layerService: LayerService) {
  }

  public get layers(): Observable<Layer[]> {
    return this.layerService.layers;
  }
}
