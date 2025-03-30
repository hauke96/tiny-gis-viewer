import {ViewOptions} from 'ol/View';

export class Config {
  constructor(
    public layers: ConfigLayer[],
    public mapView: ViewOptions
  ) {
  }
}

export class ConfigLayer {
  constructor(public capabilitiesUrl: string) {
  }
}
