import { Injectable, inject } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';
import { Router, UrlSegment } from '@angular/router';
import { tap } from 'rxjs';

// Usando el guard como una función y no como una clase
export function AuthGuard (route: Router, segments: UrlSegment[]) {

  const router = inject(Router);

  /* return inject( AuthService ).checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ){
          router.navigate(['./auth/login']);
        }
      })
    ) */
};
