import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticatorService } from '../../shared/services/auth/authenticator.service';
import { SessionStorageService } from '../../shared/services/session-storage/session-storage.service';
import { Router } from '@angular/router';
import { throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const sessionStorageService = inject(SessionStorageService);
  const authService = inject(AuthenticatorService);
  const router = inject(Router);

  return from(sessionStorageService.getSessionToken()).pipe(
    switchMap((currentToken: string) => {
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
            // Se a resposta for 401, tente atualizar o token se "stay connected" estiver true
            if (authService.getStayConnected()) {
              return from(authService.refreshToken(currentToken)).pipe(
                switchMap((refreshedToken: string) => {
                  sessionStorageService.updateSessionWithRefreshedToken(refreshedToken);
                  req = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${refreshedToken}`
                    }
                  });
                  return next(req);
                }),
                catchError(() => {
                  router.navigate(['/login']);
                  return throwError(error);
                })
              );
            } else {
              router.navigate(['/login']);
              return throwError(error);
            }
          }
          return throwError(error);
        })
      );
    })
  );
};
