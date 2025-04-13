import { Component } from '@angular/core';
import {IconButtonComponent} from '../../../common/icon-button/icon-button.component';

@Component({
  selector: 'app-legend-graphic-view',
  imports: [
    IconButtonComponent
  ],
  templateUrl: './legend-graphic-view.component.html',
  styleUrl: './legend-graphic-view.component.scss'
})
export class LegendGraphicViewComponent {
  protected expanded = true;
}
