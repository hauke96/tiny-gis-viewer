import {Component} from '@angular/core';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {MapService} from '../map.service';

@Component({
  selector: 'app-control-panel',
  imports: [
    ControlButtonComponent
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

  constructor(private mapService: MapService) {
  }

  onZoomInClicked() {
    console.log(this.mapService.zoomIn);
    this.mapService.zoomIn();
  }

  onZoomOutClicked() {
    this.mapService.zoomOut();
  }
}
