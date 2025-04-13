import {Component} from '@angular/core';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {Layer, WmsCapabilitiesLayer, WmsLayer} from '../../../map/layer';
import {LayerService} from '../../../map/layer.service';
import {NgForOf} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {Unsubscriber} from '../../../common/unsubscriber';

@Component({
  selector: 'app-legend-graphic-view',
  imports: [
    IconButtonComponent,
    NgForOf,
    LucideAngularModule
  ],
  templateUrl: './legend-graphic-view.component.html',
  styleUrl: './legend-graphic-view.component.scss'
})
export class LegendGraphicViewComponent extends Unsubscriber {
  protected expanded = true;
  protected layers: Layer[] = [];

  constructor(protected layerService: LayerService) {
    super();

    this.unsubscribeLater(
      this.layerService.layers.subscribe(layers => {
        const unwrappedLayers: Layer[] = [];

        layers.forEach(layer => {
          if (layer instanceof WmsCapabilitiesLayer) {
            unwrappedLayers.push(...layer.wmsLayers);
          } else if (layer instanceof WmsLayer) {
            unwrappedLayers.push(layer);
          }
        })

        this.layers = unwrappedLayers;
      })
    )
  }
}
