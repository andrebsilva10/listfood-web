import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
    }),
    provideRouter(routes),
  ],
};
