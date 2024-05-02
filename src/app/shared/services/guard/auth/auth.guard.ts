import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  
  if (typeof sessionStorage !== 'undefined') {
    const router = inject(Router);
    const localData = sessionStorage.getItem('accessToken');
    
    if (localData === null || localData === undefined) {
      router.navigate(['/login']);
      return false;
    }
    
    return true;
  } else {
    // Tratamento alternativo quando o localStorage não está disponível
    console.error('O sessionStorage não está disponível.');
    return false;
  }
};
