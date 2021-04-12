import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { AppUser } from './model/app-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .pipe(
        map(
          (user: AppUser) => {
            if (!user.isAdmin) {
              this.router.navigate(['/']);
            }
            return user.isAdmin;
          }
        )
      );
  }
}
