import {Component} from '@angular/core';
import {ControlButtonComponent} from '../control-button/control-button.component';
import {MapService} from '../map.service';
import {TranslatePipe} from '@ngx-translate/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-control-panel',
  imports: [
    ControlButtonComponent,
    TranslatePipe
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  protected activeMeasurementMode: 'area' | 'length' | undefined = undefined;

  constructor(private mapService: MapService) {
    mapService.areaMeasurementStarted.pipe(takeUntilDestroyed()).subscribe(() => this.activeMeasurementMode = 'area');
    mapService.areaMeasurementEnded.pipe(takeUntilDestroyed()).subscribe(() => this.activeMeasurementMode = undefined);
    mapService.lengthMeasurementStarted.pipe(takeUntilDestroyed()).subscribe(() => this.activeMeasurementMode = 'length');
    mapService.lengthMeasurementEnded.pipe(takeUntilDestroyed()).subscribe(() => this.activeMeasurementMode = undefined);
  }

  public onMeasureAreaClicked(): void {
    if (this.activeMeasurementMode === 'length') {
      this.mapService.endLengthMeasurement();
      this.mapService.startAreaMeasurement();
    } else if (this.activeMeasurementMode === 'area') {
      this.mapService.endAreaMeasurement();
    } else {
      this.mapService.startAreaMeasurement();
    }
  }

  public onMeasureLengthClicked(): void {
    if (this.activeMeasurementMode === 'length') {
      this.mapService.endLengthMeasurement();
    } else if (this.activeMeasurementMode === 'area') {
      this.mapService.endAreaMeasurement();
      this.mapService.startLengthMeasurement();
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
