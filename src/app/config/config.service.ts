import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: HttpClient) { }

  public loadConfig():Observable<Config> {
    return this.httpClient.get<Config>("./config.json");
  }
}
