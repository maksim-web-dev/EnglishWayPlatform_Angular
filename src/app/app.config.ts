import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import {JwtInterceptor} from './interceptors/JwtInterceptor';
import {AnimateDirectiveIntersection} from './interceptors/AnimateDirectiveInterception';
import {SafeHtmlPipe} from './pipes/SafeHtmlPipe';
import {provideQuillConfig} from 'ngx-quill';

export function HttpLoaderFactory(http: any) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export let appConfig: ApplicationConfig;
appConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),  // ВАЖНО: Подключаем маршруты перед `TranslateService`
    provideHttpClient(withInterceptors([JwtInterceptor])),    // Добавляем HttpClient
    TranslateModule.forRoot({ // ✅ Добавляем TranslateModule.forRoot()
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!,
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: /*true*/

          [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image'],
          [{ 'header': [1, 2, 3, false] }],
          ['clean']

        ]

      }
    }),
    TranslateService,
    AnimateDirectiveIntersection,
    SafeHtmlPipe
  ]
};
