import BaseLayer from 'ol/layer/Base';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class MapService {
  abstract addLayer(layer: BaseLayer): void;
  abstract removeLayer(layer: BaseLayer): void;
}
