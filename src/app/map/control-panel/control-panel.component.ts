import {Component} from '@angular/core';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {MapService} from '../map.service';
import {TranslatePipe} from '@ngx-translate/core';
import {Unsubscriber} from '../../common/unsubscriber';

@Component({
  selector: 'app-control-panel',
  imports: [
    ControlButtonComponent,
    TranslatePipe
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent extends Unsubscriber {
  protected isInLengthMeasureMode: boolean = false;

  constructor(private mapService: MapService) {
    super();

    this.unsubscribeLater(
      mapService.lengthMeasurementStarted.subscribe(() => this.isInLengthMeasureMode = true),
      mapService.lengthMeasurementEnded.subscribe(() => this.isInLengthMeasureMode = false)
    );
  }

  public onMeasureLengthClicked(): void {
    if (this.isInLengthMeasureMode) {
      this.mapService.endLengthMeasurement();
    } else {
      this.mapService.startLengthMeasurement();
    }
  }

  public onZoomInClicked(): void {
    this.mapService.zoomIn();
  }

  public onZoomOutClicked(): void {
    this.mapService.zoomOut();
  }
}
