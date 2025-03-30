import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: Config | undefined = undefined;

  constructor(private httpClient: HttpClient) {
  }

  public loadAndStoreConfig(): Observable<Config> {
    return this.httpClient.get<Config>("./config.json")
      .pipe(tap(c => this.config = c))
  }
}
