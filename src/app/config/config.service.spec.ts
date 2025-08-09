import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Config, LayerConfig} from './config';

describe(ConfigService.name, () => {
  let service: ConfigService;

  let httpClient: HttpClient;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    httpClient = {} as never as HttpClient;
    router = {} as never as Router;
    activatedRoute = {} as never as ActivatedRoute;

    service = new ConfigService(httpClient, router, activatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fire both events on loaded config', () => {
    // Arrange
    let config = new Config([], {}, 5);

    const configSpy = jest.fn();
    service.config.subscribe(configSpy);

    const configLoadedSpy = jest.fn();
    service.configLoaded.subscribe(configLoadedSpy);

    // Act
    service.loadConfig(config);

    // Assert
    expect(configSpy).toHaveBeenCalled();
    expect(configLoadedSpy).toHaveBeenCalled();
  });

  it('should fire config event on added config', () => {
    // Arrange
    let config = new Config([], {}, 5);
    service.loadConfig(config);

    const configSpy = jest.fn();
    service.config.subscribe(configSpy);

    const configLoadedSpy = jest.fn();
    service.configLoaded.subscribe(configLoadedSpy);

    // Act
    service.addLayerConfig({} as LayerConfig);

    // Assert
    expect(configSpy).toHaveBeenCalled();
    expect(configLoadedSpy).not.toHaveBeenCalled();
  });

  it('should fire config event on updated configs', () => {
    // Arrange
    let config = new Config([], {}, 5);
    service.loadConfig(config);

    const configSpy = jest.fn();
    service.config.subscribe(configSpy);

    const configLoadedSpy = jest.fn();
    service.configLoaded.subscribe(configLoadedSpy);

    // Act
    service.updateConfig([]);

    // Assert
    expect(configSpy).toHaveBeenCalled();
    expect(configLoadedSpy).not.toHaveBeenCalled();
  });
});
