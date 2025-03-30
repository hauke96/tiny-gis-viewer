import {Injectable} from '@angular/core';
import {Layer} from './layer';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  private layers$: BehaviorSubject<Layer[]> = new BehaviorSubject<Layer[]>([]);

  constructor() {
  }

  public get layers(): Observable<Layer[]> {
    return this.layers$.asObservable()
  }

  public addLayer(layer: Layer): void {
    let layers = this.layers$.value;
    layers.push(layer);
    this.layers$.next(layers);
  }

  public loadLayers(): void {
    const layers = [
      new Layer("OSM Hamburg example", "https://deneb.hauke-stieler.de/geo/data/wms", "osm-hh-example")
    ];
    this.layers$.next(layers);
  }
}
