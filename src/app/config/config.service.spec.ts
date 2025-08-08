import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

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
});
