import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {Config, LayerConfig, LayerType} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: Config | undefined = undefined;

  constructor(private httpClient: HttpClient) {
  }

  public loadAndStoreConfig(): Observable<Config> {
    return this.httpClient.get<Config>("./config.json")
      .pipe(
        tap(c => {
          c.layers = c.layers.map(l => Object.assign(new LayerConfig("" as LayerType, "", "", "", false, ""), l));

          const newConfig = Object.assign(new Config([], {}, 0), c);
          newConfig.validate();
          return this.config = newConfig;
        }),
        catchError(() => {
          console.error("Error reading config or the config was invalid. I use an empty config now.")
          return of(new Config([], {}, 0));
        })
      )
  }
}
