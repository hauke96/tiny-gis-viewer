import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, of, tap} from 'rxjs';
import {Config, LayerConfig, LayerType} from './config';
import {Layer} from '../layer/layer';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config$: BehaviorSubject<Config | undefined> = new BehaviorSubject<Config | undefined>(undefined);

  constructor(private httpClient: HttpClient) {
  }

  public get currentConfig(): Config | undefined {
    return this.config$.value
  }

  public get config(): Observable<Config> {
    return this.config$.asObservable().pipe(filter(c => !!c));
  }

  public loadAndStoreConfig(): Observable<Config> {
    return this.httpClient.get<Config>("./config.json")
      .pipe(
        tap(c => {
          c.layers = c.layers.map(l => Object.assign(new LayerConfig("" as LayerType, "", "", "", false, ""), l));

          const newConfig = Object.assign(new Config([], {}, 0), c);
          newConfig.validate();
          return this.config$.next(newConfig);
        }),
        catchError(e => {
          console.error(e);
          console.error("Error reading config or the config was invalid. I use an empty config now.")
          return of(new Config([], {}, 0));
        })
      )
  }

  public addLayer(layer: LayerConfig): void {
    if (!this.currentConfig) {
      throw new Error("There must be an existing config to add a layer");
    }

    let newLayers = [layer, ...this.currentConfig.layers ?? []];
    const newConfig = new Config(newLayers, this.currentConfig.mapView, this.currentConfig.queryFeatureCount);

    this.config$.next(newConfig);
  }

  public moveLayerDown(layer: Layer): void {
    if (!this.currentConfig) {
      throw new Error("There must be an existing config to add a layer");
    }


    let layers = (this.currentConfig.layers ?? []).slice();
    let indexOfLayerToMove = layers.indexOf(layer.layerConfig);

    if (indexOfLayerToMove === -1 || indexOfLayerToMove == layers.length - 1) {
      return;
    }

    // Swap elements
    let layerConfig = layers[indexOfLayerToMove];
    layers[indexOfLayerToMove] = layers[indexOfLayerToMove + 1];
    layers[indexOfLayerToMove + 1] = layerConfig;

    const newConfig = new Config(layers, this.currentConfig.mapView, this.currentConfig.queryFeatureCount);
    this.config$.next(newConfig);
  }

  public deleteLayer(layer: Layer): void {
    if (!this.currentConfig) {
      throw new Error("There must be an existing config to add a layer");
    }

    let layers = (this.currentConfig.layers ?? []).slice();
    let indexOfLayerToDelete = layers.indexOf(layer.layerConfig);

    if (indexOfLayerToDelete === -1) {
      return;
    }

    // Remove item at index
    layers.splice(indexOfLayerToDelete, 1);

    const newConfig = new Config(layers, this.currentConfig.mapView, this.currentConfig.queryFeatureCount);
    this.config$.next(newConfig);
  }
}
