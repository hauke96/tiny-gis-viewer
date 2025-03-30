export class Config {
  constructor(public layers: ConfigLayer[]) {
  }
}

export class ConfigLayer {
  constructor(public capabilitiesUrl: string) {
  }
}
