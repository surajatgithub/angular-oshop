import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

import { AppUser } from './../model/app-user.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.appUser$.subscribe(
      (user: AppUser) => {
        this.appUser = user;
      }
    );
  }

  ngOnInit(): void {

  }

  logout() {
    this.auth.logout().then(
      (response) => {
        this.router.navigate(['/login']);
      }
    );
  }

  ngOnDestroy() {

  }
}