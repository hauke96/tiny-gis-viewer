import {Component} from '@angular/core';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {Layer, WmsCapabilitiesLayer, WmsLayer} from '../../../map/layer';
import {LayerService} from '../../../map/layer.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-legend-graphic-view',
  imports: [
    IconButtonComponent,
    NgForOf,
    AsyncPipe,
    LucideAngularModule
  ],
  templateUrl: './legend-graphic-view.component.html',
  styleUrl: './legend-graphic-view.component.scss'
})
export class LegendGraphicViewComponent {
  protected expanded = true;

  constructor(protected layerService: LayerService) {
  }

  public get layers(): Observable<Layer[]> {
    return this.layerService.layers
      .pipe(
        map((layers: Layer[]) => {
          const unwrappedLayers: Layer[] = [];

          layers.forEach(layer => {
            if (layer instanceof WmsCapabilitiesLayer) {
              unwrappedLayers.push(...layer.wmsLayers);
            } else if (layer instanceof WmsLayer) {
              unwrappedLayers.push(layer);
            }
          })

          return unwrappedLayers;
        }),
      );
  }
}
