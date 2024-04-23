import { CanActivateFn } from '@angular/router';


export const routeGuardGuard: CanActivateFn = (route, state) => {

    // Check if the user is logged in
    if (!localStorage.getItem('token')) {
        return true;
    }

  return false;
};
