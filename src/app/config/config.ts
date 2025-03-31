import {ViewOptions} from 'ol/View';

export class Config {
  constructor(
    public layers: ConfigLayer[],
    public mapView: ViewOptions,
    public queryFeatureCount: number,
  ) {
  }
}

export class ConfigLayer {
  constructor(public capabilitiesUrl: string) {
  }
}
