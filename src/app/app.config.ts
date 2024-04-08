import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './modules/user-portal/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: 
  [ provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch())
  ]
};
