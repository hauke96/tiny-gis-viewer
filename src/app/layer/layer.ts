import {BehaviorSubject, Observable} from 'rxjs';
import {LayerConfig} from '../config/config';

export abstract class Layer {
  private visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * @param layerConfig Configuration object for this layer
   */
  protected constructor(
    public layerConfig: LayerConfig
  ) {
    // When this property is not set, then show the layer by default
    this.setVisible(layerConfig.initiallyVisible === undefined ? true : layerConfig.initiallyVisible);
  }

  public get title(): string {
    return this.layerConfig.title;
  }

  public get name(): string {
    return this.layerConfig.name;
  }

  public get url(): string {
    return this.layerConfig.url;
  }

  public get attribution(): string {
    return this.layerConfig.attribution;
  }

  public get queryable(): boolean {
    return this.layerConfig.queryable;
  }

  public setVisible(visible: boolean): void {
    this.visible$.next(visible);
  }

  public isVisible(): boolean {
    return this.visible$.value;
  }

  public get visible(): Observable<boolean> {
    return this.visible$.asObservable()
  }
}

export class WmsCapabilitiesLayer extends Layer {
  /**
   * @param layerConfig Configuration object for this layer
   * @param wmsLayers Layers behind the given Capabilities-URL
   */
  constructor(
    layerConfig: LayerConfig,
    public wmsLayers: WmsLayer[]
  ) {
    super(layerConfig);
  }

  public override setVisible(visible: boolean): void {
    this.wmsLayers?.forEach(l => l.setVisible(visible));
    super.setVisible(visible);
  }
}

export class WmsLayer extends Layer {
  /**
   * @param layerConfig Configuration object for this layer
   */
  constructor(
    layerConfig: LayerConfig,
  ) {
    super(layerConfig);
  }
}

export class XyzLayer extends Layer {
  /**
   * @param layerConfig Configuration object for this layer
   */
  constructor(
    layerConfig: LayerConfig,
  ) {
    super(layerConfig);
  }
}
