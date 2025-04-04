import {Component, Input} from '@angular/core';
import {LayerService} from '../../../layer/layer.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Layer} from '../../../layer/layer';
import {Observable} from 'rxjs';
import {LayerListItemComponent} from '../layer-list-item/layer-list-item.component';
import {ConfigService} from '../../../config/config.service';

@Component({
  selector: 'app-layer-list',
  imports: [
    NgForOf,
    AsyncPipe,
    TranslatePipe,
    NgIf,
    LayerListItemComponent
  ],
  templateUrl: './layer-list.component.html',
  styleUrl: './layer-list.component.scss'
})
export class LayerListComponent {
  @Input() expanded!: boolean;

  constructor(protected layerService: LayerService, protected configService: ConfigService) {
  }

  public get layers(): Observable<Layer[]> {
    return this.layerService.layers;
  }

  public onMoveLayerDown(layer: Layer): void {
    this.configService.moveLayerDown(layer);
  }

  public onDeleteLayer(layer: Layer): void {
    this.configService.deleteLayer(layer);
  }
}
