import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user.model';
import { AuthService } from 'shared/services/auth.service';

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
