import {LayerService} from './layer.service';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';

describe(LayerService.name, () => {
  let service: LayerService;

  let configService: ConfigService;
  let httpClient: HttpClient;

  beforeEach(() => {
    configService = {} as never as ConfigService;
    httpClient = {} as never as HttpClient;

    service = new LayerService(httpClient, configService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
