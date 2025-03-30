import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from './map/map.component';
import {LayerService} from './layer/layer.service';

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tiny-gis-viewer';

  constructor(private layerService: LayerService) {
  }

  ngOnInit() {
    this.layerService.loadLayers();
  }
}
