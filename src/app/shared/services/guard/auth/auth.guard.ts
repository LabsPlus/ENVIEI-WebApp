import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StayConnectedService } from '../../../../user-portal/services/stay-connected/stay-connected.service';


export const authGuard: CanActivateFn = async (route, state) => {
  const isConnected = inject(StayConnectedService);
  const router = inject(Router);

  const isAuthenticated = await isConnected.hasAlreadyConnected();
console.log(isAuthenticated);

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { StayConnectedService } from '../../../../user-portal/services/stay-connected/stay-connected.service';
// import { Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { switchMap, tap } from 'rxjs/operators';

// export const authGuard: CanActivateFn = (route, state) => {
//   const stayConnectedService = inject(StayConnectedService);
//   const router = inject(Router);

//   return stayConnectedService.hasAlreadyConnected().pipe(
//     tap((isAuthenticated: boolean) => console.log(isAuthenticated)),
//     switchMap((isAuthenticated: boolean) => {
//       if (!isAuthenticated) {
//         router.navigate(['/login']);
//         return of(false);
//       }
//       return of(true);
//     })
//   );
// };

