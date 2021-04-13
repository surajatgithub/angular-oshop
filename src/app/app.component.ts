import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.auth.user$.subscribe(
      (user) => {
        if (user) {
          this.userService.save(user);
          let redirectUrls = localStorage.getItem('redirectUrl') || '/';
          this.router.navigateByUrl(redirectUrls);
        }
      }
    );
  }

  ngOnDestroy() {

  }
}
