import {Component, ChangeDetectionStrategy} from '@angular/core';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';
import {Layer} from '../../../map/layer';
import {LayerService} from '../../../map/layer.service';

import {LucideAngularModule} from 'lucide-angular';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-legend-graphic-view',
  imports: [
    IconButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './legend-graphic-view.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './legend-graphic-view.component.scss'
})
export class LegendGraphicViewComponent {
  protected expanded = true;
  protected layers: Layer[] = [];

  constructor(protected layerService: LayerService) {
    this.layerService.layers.pipe(takeUntilDestroyed()).subscribe(layers => {
      this.layers = layers.flatMap(layer => layer.getSubLayers() ?? [layer]);
    })
  }
}
