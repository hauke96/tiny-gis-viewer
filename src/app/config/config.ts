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

export type LayerType = "wms" | "wms-capabilities" | "xyz";

export class LayerConfig {
  constructor(
    public type: LayerType,
    public url: string,
    public title: string,
    public name: string,
    public queryable: boolean,
    public attribution: string,
    public initiallyVisible: boolean | undefined
  ) {
  }

  public validate(): void {
    switch (this.type) {
      case "wms":
        if (!this.name || this.name.trim() === "") {
          throw new Error("name must be set");
        }
        if (!this.title || this.title.trim() === "") {
          throw new Error(`title must be set on layer with name '${this.name}'`);
        }
        break;
      case "wms-capabilities":
        break;
      case "xyz":
        if (this.name && this.name.trim() !== "") {
          throw new Error("name must not be set for xyz layers");
        }
        if (this.queryable) {
          throw new Error("xyz layers cannot be queryable");
        }
        if (!this.title || this.title.trim() === "") {
          throw new Error("title must be set on xyz layer");
        }
        break;
      default:
        throw new Error(`Unknown type '${this.type}'`);
    }

    if (!this.url || this.url.trim() === "") {
      throw new Error(`url must be set on layer with name '${this.name}`);
    }
  }
}
