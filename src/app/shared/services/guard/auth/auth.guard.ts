import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticatorService } from '../../auth/authenticator.service';
import { SessionStorageService } from '../../session-storage/session-storage.service';
import { Router } from '@angular/router';
import { ToastrNotificationService } from '../../../../user-portal/services/toastr/toastr.service';

export const authGuard : CanActivateFn = async (route, state) => {

  const authService = inject(AuthenticatorService);
  const sessionStorageService = inject(SessionStorageService);
  const router = inject(Router);
  const toastr = inject(ToastrNotificationService);

  const token = sessionStorageService.getSessionToken() !== null ? sessionStorageService.getSessionToken() :  '';

  if (!token) {
    return false;
  }

  const isAuthenticated = await authService.isAuthenticated(token);

  if (authService.getStayConnected() && isAuthenticated) {

    const refreshedToken = await authService.refreshToken(token);
    sessionStorageService.updateSessionWithRefreshedToken(refreshedToken);
    return true;

  }

  

  return isAuthenticated;
};


