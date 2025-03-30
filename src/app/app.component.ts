import {Component, OnInit} from '@angular/core';
import {MapComponent} from './map/map.component';
import {LayerService} from './layer/layer.service';
import {SidebarComponent} from './sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'tiny-gis-viewer';

  constructor(private layerService: LayerService) {
  }

  ngOnInit() {
    this.layerService.loadLayersFromCapabilities('https://deneb.hauke-stieler.de/geo/data/wms?SERVICE=WMS&request=GetCapabilities');
  }
}
