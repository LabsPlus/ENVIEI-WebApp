import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticatorService } from '../../shared/services/auth/authenticator.service';
import { SessionStorageService } from '../../shared/services/session-storage/session-storage.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const sessionStorageService = inject(SessionStorageService);
  const authService = inject(AuthenticatorService);
  const router = inject(Router);

  const currentToken = sessionStorageService.getSessionToken();


  if (currentToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === 401) {
        // If 401 response, try to refresh the token if stay connected is true
        if (authService.getStayConnected()) {
          return authService.refreshToken(currentToken as string).then(
              (refreshedToken) => {
                  sessionStorageService.updateSessionWithRefreshedToken(refreshedToken);
                  req = req.clone({
                  setHeaders: {
                      Authorization: `Bearer ${refreshedToken}`
                  }
                  });
                  return next(req);
              }
              ).catch(() => {
              router.navigate(['/login']);
              return throwError(error);
          });
        } else {
          router.navigate(['/login']);
        }
      }
      return throwError(error);
    })
  ) as any;
};
