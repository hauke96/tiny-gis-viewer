import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, mergeMap, Observable, of} from 'rxjs';
import {Config, LayerConfig} from './config';
import {Layer} from '../map/layer';
import {ActivatedRoute, Router} from '@angular/router';
import {deflate, inflate} from 'pako';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config$: BehaviorSubject<Config | undefined> = new BehaviorSubject<Config | undefined>(undefined);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  public get currentConfig(): Config | undefined {
    return this.config$.value
  }

  public get config(): Observable<Config> {
    return this.config$.asObservable().pipe(filter(c => !!c));
  }

  public getConfigAsJson(): string {
    return JSON.stringify(this.currentConfig, null, 2);
  }

  public storeConfigInUrl(): void {
    let configAsJson = this.getConfigAsJson();

    let deflatedConfigBytes = deflate(configAsJson);

    let compressedConfigString = "";
    Array.from(deflatedConfigBytes)
      .map(c => String.fromCharCode(c))
      .forEach(c => compressedConfigString += c);

    let compressedConfigBase64 = btoa(compressedConfigString);

    let queryParams = {config: compressedConfigBase64};
    this.router.navigate([], {relativeTo: this.route, queryParams, queryParamsHandling: "merge"})
  }

  public loadConfigFromUrl(configStringFromUrl: string): Observable<Config> {
    let base64Decoded = atob(configStringFromUrl);

    let uint8Array = Uint8Array.from(Array.from(base64Decoded).map(letter => letter.charCodeAt(0)));

    let inflatedConfigString = inflate(uint8Array, {to: 'string'});

    let config = JSON.parse(inflatedConfigString);

    return this.loadConfig(config);
  }

  public loadConfigFromJson(jsonString: string): void {
    this.loadConfig(JSON.parse(jsonString) as Config);
  }

  public loadConfigByName(configName: string): Observable<Config> {
    console.debug(`Load config '${configName}'`)

    const allowedChars = "a-zA-z0-9-_"
    if (!configName.match("^[" + allowedChars + "]+$")) {
      console.error(`Config name '${configName}' contains invalid characters. Allowed are: ${allowedChars}`)
      return of();
    }

    return this.httpClient.get<Config>(`./${configName}.json`)
      .pipe(
        catchError(e => {
          console.error(e);
          console.error("Error reading config or the config was invalid. I use an empty config now.")
          const defaultLayer = new LayerConfig(
            'xyz',
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            "OpenStreetMap Carto",
            "",
            false,
            "© OpenStreetMap contributors",
            true,
            undefined
          );
          return of(new Config([defaultLayer], {}, 1));
        }),
        mergeMap(c => {
          return this.loadConfig(c);
        })
      )
  }

  public loadConfig(c: Config): Observable<Config> {
    c.layers = c.layers.map(l => {
      return Object.assign(
        LayerConfig.newDefaultLayerConfig(),
        l
      );
    });

    const newConfig = Object.assign(new Config([], {}, 0), c);
    newConfig.layers = this.objectAssignLayerConfigs(newConfig.layers);
    newConfig.validate();
    this.config$.next(newConfig);

    return of(newConfig);
  }

  private objectAssignLayerConfigs(layerConfigs: LayerConfig[]) {
    return layerConfigs.map(layerConfig => {
      layerConfig = Object.assign(LayerConfig.newDefaultLayerConfig(), layerConfig);
      if (layerConfig.children) {
        layerConfig.children = this.objectAssignLayerConfigs(layerConfig.children);
      }
      return layerConfig
    })
  }

  /**
   * Adds the layer to the top of the config list and propagates this change via the "config$" event.
   */
  public addLayerConfig(layer: LayerConfig): void {
    if (!this.currentConfig) {
      throw new Error("There must be an existing config to add a layer");
    }

    let newLayers = [layer, ...this.currentConfig.layers ?? []];
    const newConfig = new Config(newLayers, this.currentConfig.mapView, this.currentConfig.queryFeatureCount);

    this.config$.next(newConfig);
  }

  /**
   * Updates the current config based on the "layerConfig" property of the given layers. The new config will be
   * propagated using the "config$" event.
   */
  public updateConfig(layers: Layer[]): void {
    if (!this.currentConfig) {
      throw new Error("There must be an existing config to add a layer");
    }

    const layerConfigs = layers.map(l => l.layerConfig);
    const newConfig = new Config(layerConfigs, this.currentConfig.mapView, this.currentConfig.queryFeatureCount);
    this.config$.next(newConfig);
  }
}
