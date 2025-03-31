import {ViewOptions} from 'ol/View';

export class Config {
  constructor(
    public layers: LayerConfig[],
    public mapView: ViewOptions,
    public queryFeatureCount: number,
  ) {
  }
}

export type LayerType = "wms" | "wms-capabilities";

export class LayerConfig {
  constructor(
    public type: LayerType,
    public url: string,
    public title: string,
    public name: string,
  ) {
    // TODO directly validate input parameters
  }
}
