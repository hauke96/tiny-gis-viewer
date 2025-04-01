import {Injectable} from '@angular/core';
import {Layer, WmsLayer, XyzLayer} from './layer';
import {BehaviorSubject, forkJoin, map, Observable, of} from 'rxjs';
import {WMSCapabilities} from 'ol/format';
import {HttpClient} from '@angular/common/http';
import {GetCapabilitiesDto} from './get-capabilities-dto';
import {Config} from '../config/config';

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
    const layerObservables = config.layers.map(layer => {
      switch (layer.type) {
        case "wms":
          return this.loadWmsLayer(layer.title, layer.url, layer.name, layer.queryable, layer.attribution);
        case "wms-capabilities":
          return this.loadLayersFromCapabilities(layer.url);
        case "xyz":
          return this.loadXyzLayer(layer.title, layer.url, layer.attribution);
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

  public loadLayersFromCapabilities(capabilitiesUrlString: string): Observable<Layer[]> {

    const capabilitiesUrl = new URL(capabilitiesUrlString);
    const wmsBaseUrl = capabilitiesUrl.origin + capabilitiesUrl.pathname;

    console.log(`Load layers from ${capabilitiesUrl}`);

    return this.httpClient.get(capabilitiesUrlString, {responseType: 'text'})
      .pipe(
        map(response => {
          const parser = new WMSCapabilities();
          const result = parser.read(response) as GetCapabilitiesDto;

          if (!result.Capability || !result.Capability.Layer || !result.Capability.Layer.Layer || result.Capability.Layer.Layer.length === 0) {
            console.log("Result of GetCapabilities request has no layers")
            return [];
          }

          return result.Capability.Layer.Layer.map(layerDto => {
            return new WmsLayer(layerDto.Title, wmsBaseUrl, layerDto.Name, layerDto.queryable, layerDto.Attribution?.Title ?? "")
          });
        })
      )
  }

  private loadWmsLayer(title: string, url: string, name: string, queryable: boolean, attribution: string): Observable<Layer[]> {
    return of([new WmsLayer(title, url, name, queryable, attribution)]);
  }

  private loadXyzLayer(title: string, url: string, attribution: string): Observable<Layer[]> {
    return of([new XyzLayer(title, url, attribution)]);
  }
}
