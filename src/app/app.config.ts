import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideNgxMask(),
  ],
};
