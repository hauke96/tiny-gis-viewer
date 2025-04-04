import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, of, tap} from 'rxjs';
import {Config, LayerConfig, LayerType} from './config';

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
}
