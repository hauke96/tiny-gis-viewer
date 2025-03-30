import {Injectable} from '@angular/core';
import {Layer} from './layer';
import {BehaviorSubject, Observable} from 'rxjs';
import {WMSCapabilities} from 'ol/format';
import {HttpClient} from '@angular/common/http';
import {GetCapabilitiesDto} from './get-capabilities-dto';

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

  public loadLayersFromCapabilities(capabilitiesUrlString: string): void {
    const layers: Layer[] = [];

    const capabilitiesUrl = new URL(capabilitiesUrlString);
    const wmsBaseUrl = capabilitiesUrl.origin + capabilitiesUrl.pathname;

    this.httpClient.get(capabilitiesUrlString, {responseType: 'text'})
      .subscribe({
        next: response => {
          const parser = new WMSCapabilities();
          const result = parser.read(response) as GetCapabilitiesDto;

          if (!result.Capability || !result.Capability.Layer || !result.Capability.Layer.Layer || result.Capability.Layer.Layer.length === 0) {
            console.log("Result of GetCapabilities request has no layers")
            return
          }

          result.Capability.Layer.Layer.forEach(layerDto => {
            const layer = new Layer(layerDto.Title, wmsBaseUrl, layerDto.Name)
            layers.push(layer);
          })

          this.layers$.next(layers);
        },
        error: (e: Error) => console.error(e)
      });
  }
}
