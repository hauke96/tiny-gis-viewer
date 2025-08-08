import {Injectable} from '@angular/core';
import {GroupLayer, Layer, WmsCapabilitiesLayer, WmsLayer, XyzLayer} from './layer';
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
      return this.loadLayer(layer);
    });
    forkJoin(layerObservables)
      .subscribe(layers => {
        this.setLayers(layers.filter(l => !!l).flatMap(l => l));
      });
  }

  private loadLayer(layerConfig: LayerConfig): Observable<Layer | undefined> {
    switch (layerConfig.type) {
      case "group":
        return this.loadGroupLayer(layerConfig)
      case "wms":
        return this.loadWmsLayer(layerConfig);
      case "wms-capabilities":
        return this.loadLayersFromCapabilities(layerConfig);
      case "xyz":
        return this.loadXyzLayer(layerConfig);
      default:
        console.error(`Unknown layer type '${layerConfig.type}'`);
        return of(undefined);
    }
  }

  private loadGroupLayer(layerConfig: LayerConfig): Observable<Layer> {
    if (layerConfig.children) {
      let childLayerObservables = layerConfig.children.map(child => this.loadLayer(child));
      return forkJoin(childLayerObservables)
        .pipe(map(layer => new GroupLayer(layerConfig, layer.filter(l => !!l))))
    }
    return of(new GroupLayer(layerConfig, []));
  }

  public loadLayersFromCapabilities(layerConfig: LayerConfig): Observable<WmsCapabilitiesLayer | undefined> {
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
            return undefined;
          }

          let wmsLayers = result.Capability.Layer.Layer.map(layerDto => {
            let wmsLayerConfig = new LayerConfig(
              'wms',
              wmsBaseUrl,
              layerDto.Title,
              layerDto.Name,
              layerDto.queryable,
              layerDto.Attribution?.Title ?? "",
              true,
              undefined
            );
            return new WmsLayer(wmsLayerConfig)
          });

          layerConfig.name = result.Service.Name;
          layerConfig.title = result.Service.Title;
          return new WmsCapabilitiesLayer(layerConfig, wmsLayers);
        })
      )
  }

  private loadWmsLayer(layerConfig: LayerConfig): Observable<Layer> {
    return of(new WmsLayer(layerConfig));
  }

  private loadXyzLayer(layerConfig: LayerConfig): Observable<Layer> {
    return of(new XyzLayer(layerConfig));
  }
}
