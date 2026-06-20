import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withXhr} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {
  LucideChevronUp,
  LucideFile,
  LucideFileDown,
  LucideFileUp,
  LucideLayers,
  LucideLayers2,
  LucideMinus,
  LucideMoveDown,
  LucidePentagon,
  LucidePlus,
  LucideRuler,
  LucideSave,
  LucideShare2,
  LucideTrash,
  LucideTrash2,
  LucideX,
  provideLucideIcons
} from '@lucide/angular';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withXhr()),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideLucideIcons(
      LucideLayers,
      LucideLayers2,
      LucideSave,
      LucideX,
      LucideMoveDown,
      LucideTrash,
      LucideTrash2,
      LucidePentagon,
      LucideRuler,
      LucidePlus,
      LucideMinus,
      LucideFile,
      LucideFileUp,
      LucideFileDown,
      LucideChevronUp,
      LucideShare2
    ),
  ]
};
