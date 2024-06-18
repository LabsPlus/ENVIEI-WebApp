import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { StayConnectedService } from '../../../../user-portal/services/stay-connected/stay-connected.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const stayConnectedService = inject(StayConnectedService);

  const token = stayConnectedService.getAccessToken();

  if (token) {
      const result = await stayConnectedService.hasAlreadyConnected(token);
      return result !== null ? result : false;
  }
  return false;  
};


