import {Config} from './config';
import {ConfigService} from './config.service';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';

export const configResolver: () => Observable<Config> = () => {
  const configService = inject(ConfigService);
  return configService.loadAndStoreConfig();
}
