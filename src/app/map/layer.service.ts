import {Injectable} from '@angular/core';
import {GroupLayer, Layer, WmsCapabilitiesLayer, WmsLayer, XyzLayer} from './layer';
import {BehaviorSubject, forkJoin, map, Observable, of} from 'rxjs';
import {WMSCapabilities} from 'ol/format';
import {HttpClient} from '@angular/common/http';
import {GetCapabilitiesDto} from './get-capabilities-dto';
import {Config, LayerConfig} from '../config/config';
import {ConfigService} from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  private layers$: BehaviorSubject<Layer[]> = new BehaviorSubject<Layer[]>([]);

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
  }

  public get layers(): Observable<Layer[]> {
    return this.layers$.asObservable()
  }

  public get currentLayers(): Layer[] {
    return this.layers$.value;
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
            console.log("Result of GetCapabilities request has no capabilities and/or no layers")
            return undefined;
          }

          let featureInfoFormats = result.Capability.Request?.GetFeatureInfo?.Format ?? [];

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
            return new WmsLayer(wmsLayerConfig, featureInfoFormats)
          });

          layerConfig.name = result.Service.Name;
          layerConfig.title = result.Service.Title;
          return new WmsCapabilitiesLayer(layerConfig, wmsLayers);
        })
      )
  }

  private loadWmsLayer(layerConfig: LayerConfig): Observable<Layer> {
    const capabilitiesUrl = new URL(layerConfig.url);
    capabilitiesUrl.searchParams.set('REQUEST', "GetCapabilities");

    return this.httpClient.get(capabilitiesUrl.toString(), {responseType: 'text'})
      .pipe(
        map(response => {
          const parser = new WMSCapabilities();
          const result = parser.read(response) as GetCapabilitiesDto;

          let featureInfoFormats = result.Capability?.Request?.GetFeatureInfo?.Format ?? [];

          return new WmsLayer(layerConfig, featureInfoFormats);
        })
      );
  }

  private loadXyzLayer(layerConfig: LayerConfig): Observable<Layer> {
    return of(new XyzLayer(layerConfig));
  }

  public moveLayerDown(layer: Layer): void {
    let layers = this.currentLayers.slice();
    let indexOfLayerToMove = layers.indexOf(layer);

    if (indexOfLayerToMove === -1 || indexOfLayerToMove == layers.length - 1) {
      return;
    }

    // Swap elements
    let layerConfig = layers[indexOfLayerToMove];
    layers[indexOfLayerToMove] = layers[indexOfLayerToMove + 1];
    layers[indexOfLayerToMove + 1] = layerConfig;

    this.configService.updateConfig(layers);
  }

  public deleteLayer(layer: Layer): void {
    let layers = this.currentLayers.slice();
    let indexOfLayerToDelete = layers.indexOf(layer);

    if (indexOfLayerToDelete === -1) {
      throw new Error(`Layer ${layer.name} was not found and could not be removed`);
    }

    // Remove item at index
    layers.splice(indexOfLayerToDelete, 1);

    this.configService.updateConfig(layers);
  }

  public setLayerVisibility(layer: Layer, isVisible: boolean): void {
    layer.setVisible(isVisible);

    // WmsCapabilitiesLayer are special because they have sub-layers that are note represented by any LayerConfig, thus
    // we don't need to reload any configs.
    const allCapabilitiesLayer = this.currentLayers.flatMap(l => this.unwrapLayer(l)).filter(l => l instanceof WmsCapabilitiesLayer);
    let isPartOfCapabilitiesLayer = allCapabilitiesLayer.some(l => l.getSubLayers()?.includes(layer));

    if (!isPartOfCapabilitiesLayer) {
      this.configService.updateConfig(this.currentLayers);
    }
  }

  public unwrapLayer(layer: Layer): Layer[] {
    let subLayers = layer.getSubLayers();
    if (!subLayers) {
      return [layer];
    }

    const unwrappedSubLayers = subLayers.flatMap(l => this.unwrapLayer(l));

    return [layer, ...unwrappedSubLayers];
  }
}
