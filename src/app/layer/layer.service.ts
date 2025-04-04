import {Injectable} from '@angular/core';
import {Layer, WmsCapabilitiesLayer, WmsLayer, XyzLayer} from './layer';
import {BehaviorSubject, forkJoin, map, Observable, of} from 'rxjs';
import {WMSCapabilities} from 'ol/format';
import {HttpClient} from '@angular/common/http';
import {GetCapabilitiesDto} from './get-capabilities-dto';
import {Config, LayerConfig} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  private layers$: BehaviorSubject<Layer[]> = new BehaviorSubject<Layer[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  public get layers(): Observable<Layer[]> {
    return this.layers$.asObservable()
  }

  public setLayers(layers: Layer[]): void {
    this.layers$.next(layers);
  }

  public loadFromConfig(config: Config) {
    if (!config.layers || config.layers.length === 0) {
      this.setLayers([]);
      return;
    }

    const layerObservables = config.layers.map(layer => {
      switch (layer.type) {
        case "wms":
          return this.loadWmsLayer(layer);
        case "wms-capabilities":
          return this.loadLayersFromCapabilities(layer);
        case "xyz":
          return this.loadXyzLayer(layer);
        default:
          console.error(`Unknown layer type '${layer.type}'`);
          return of([]);
      }
    });
    forkJoin(layerObservables)
      .subscribe(layers => {
        this.setLayers(layers.flatMap(l => l));
      });
  }

  public loadLayersFromCapabilities(layerConfig: LayerConfig): Observable<WmsCapabilitiesLayer[]> {
    const capabilitiesUrl = new URL(layerConfig.url);
    const wmsBaseUrl = capabilitiesUrl.origin + capabilitiesUrl.pathname;

    console.log(`Load layers from ${capabilitiesUrl}`);

    return this.httpClient.get(layerConfig.url, {responseType: 'text'})
      .pipe(
        map(response => {
          const parser = new WMSCapabilities();
          const result = parser.read(response) as GetCapabilitiesDto;

          if (!result.Capability || !result.Capability.Layer || !result.Capability.Layer.Layer || result.Capability.Layer.Layer.length === 0) {
            console.log("Result of GetCapabilities request has no layers")
            return [];
          }

          let wmsLayers = result.Capability.Layer.Layer.map(layerDto => {
            let wmsLayerConfig = new LayerConfig('wms', wmsBaseUrl, layerDto.Title, layerDto.Name, layerDto.queryable, layerDto.Attribution?.Title ?? "");
            return new WmsLayer(wmsLayerConfig)
          });

          layerConfig.name = result.Service.Name;
          layerConfig.title = result.Service.Title;
          return [new WmsCapabilitiesLayer(layerConfig, wmsLayers)];
        })
      )
  }

  private loadWmsLayer(layerConfig: LayerConfig): Observable<Layer[]> {
    return of([new WmsLayer(layerConfig)]);
  }

  private loadXyzLayer(layerConfig: LayerConfig): Observable<Layer[]> {
    return of([new XyzLayer(layerConfig)]);
  }
}
