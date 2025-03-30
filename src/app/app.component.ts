import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from './map/map.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tiny-gis-viewer';
}
