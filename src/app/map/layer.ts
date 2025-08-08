import {BehaviorSubject, Observable} from 'rxjs';
import {LayerConfig} from '../config/config';

export abstract class Layer {
  private visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public legendGraphicUrl: string | undefined = undefined;

  // When using @for expressions in the HTML, a track value is needed. Using the whole object is discouraged. Since
  // a layer doesn't have an ID, we use a numeric value as track value.
  private static trackKeyCounter: number = 0;
  public readonly trackKey: number;

  /**
   * @param layerConfig Configuration object for this layer
   */
  protected constructor(
    public layerConfig: LayerConfig
  ) {
    // When this property is not set, then show the layer by default
    this.setVisible(layerConfig.initiallyVisible === undefined ? true : layerConfig.initiallyVisible);
    this.trackKey = Layer.trackKeyCounter++;
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
    this.getSubLayers()?.forEach(l => l.setVisible(visible));
    this.layerConfig.initiallyVisible = visible;
    this.visible$.next(visible);
  }

  public isVisible(): boolean {
    return this.visible$.value;
  }

  public get visible(): Observable<boolean> {
    return this.visible$.asObservable()
  }

  public abstract getSubLayers(): Layer[] | undefined
}

export class GroupLayer extends Layer {
  /**
   * @param layerConfig Configuration object for this layer
   * @param children Child layers of this group layer.
   */
  constructor(
    layerConfig: LayerConfig,
    public children: Layer[]
  ) {
    super(layerConfig);
  }

  public override getSubLayers(): Layer[] | undefined {
    return this.children;
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
    // Ensure all sub-layers have the same initial visibility as the capabilities-layer
    this.setVisible(layerConfig.initiallyVisible === undefined ? true : layerConfig.initiallyVisible);
  }

  public override getSubLayers(): Layer[] | undefined {
    return this.wmsLayers;
  }
}

export class WmsLayer extends Layer {
  public readonly featureInfoResponseTypes: string[];

  /**
   * @param layerConfig Configuration object for this layer
   * @param featureInfoResponseTypes List of MIME-types that are supported for the GetFeatureInfo requests.
   */
  constructor(
    layerConfig: LayerConfig,
    featureInfoResponseTypes: string[]
  ) {
    super(layerConfig);
    this.featureInfoResponseTypes = featureInfoResponseTypes;
  }

  public override getSubLayers(): Layer[] | undefined {
    return undefined;
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

  public override getSubLayers(): Layer[] | undefined {
    return undefined;
  }
}
