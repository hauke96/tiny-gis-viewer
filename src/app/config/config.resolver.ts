import {ConfigService} from './config.service';
import {inject} from '@angular/core';
import {Config} from './config';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';

export const configResolver: ResolveFn<Config> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const configService = inject(ConfigService);

  if (route.queryParamMap.has("config")) {
    return configService.loadConfigFromUrl(route.queryParamMap.get("config")!);
  } else {
    return configService.loadDefaultConfig();
  }
}
