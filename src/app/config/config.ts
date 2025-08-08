import {ViewOptions} from 'ol/View';

export class Config {
  constructor(
    public layers: LayerConfig[],
    public mapView: ViewOptions,
    public queryFeatureCount: number,
  ) {
  }

  public validate(): void {
    if (this.queryFeatureCount <= 0) {
      throw new Error(`queryFeatureCount must be at least 1 but way ${this.queryFeatureCount}`);
    }

    this.layers.forEach(l => l.validate());
  }
}

export type LayerType = "group" | "wms" | "wms-capabilities" | "xyz";

export class LayerConfig {
  constructor(
    public type: LayerType,
    public url: string,
    public title: string,
    public name: string,
    public queryable: boolean,
    public attribution: string,
    public initiallyVisible: boolean | undefined,
    public children: LayerConfig[] | undefined
  ) {
  }

  public validate(): void {
    switch (this.type) {
      case "group":
        this.validateName();
        this.validateTitle();
        this.validateChildren();
        break;
      case "wms":
        this.validateName();
        this.validateTitle();
        this.validateUrl();
        this.validateChildren();
        break;
      case "wms-capabilities":
        this.validateUrl();
        this.validateChildren();
        break;
      case "xyz":
        this.validateName();
        this.validateTitle();
        this.validateUrl();
        this.validateChildren();
        if (this.queryable) {
          throw new Error("xyz layers cannot be queryable");
        }
        break;
      default:
        throw new Error(`Unknown type '${this.type}'`);
    }
  }

  private validateName(): void {
    if (!this.name && this.name.trim() === "") {
      throw new Error(`name must be set on layer ${JSON.stringify(this)}`);
    }
  }

  private validateTitle(): void {
    if (!this.title || this.title.trim() === "") {
      throw new Error(`title must be set on layer with name '${this.name}'`);
    }
  }

  private validateUrl(): void {
    if (!this.url || this.url.trim() === "") {
      throw new Error(`url must be set on layer with name '${this.name}`);
    }
  }

  private validateChildren(): void {
    if (this.type != "group" && this.children != undefined) {
      throw new Error(`children are not allowed on layer with name '${this.name} of type ${this.type}`);
    }

    this.children?.forEach(child => child.validate());
  }

  public static newDefaultLayerConfig(): LayerConfig {
    return new LayerConfig("" as LayerType, "", "", "", false, "", undefined, undefined);
  }
}
