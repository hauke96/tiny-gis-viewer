import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {configResolver} from './config/config.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: {
      config: configResolver
    }
  },
];
