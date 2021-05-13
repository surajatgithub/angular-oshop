import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { AppUser } from 'shared/models/app-user.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  shoppingCart$: Observable<ShoppingCart>;
  shoppingCartItemQuantityCounts: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.auth.appUser$.subscribe(
      (user: AppUser) => {
        this.appUser = user;
      }
    );
  }

  logout() {
    this.auth.logout().then(
      (response) => {
        this.router.navigate(['/login']);
      }
    );
  }

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartService.getById();
  }

  ngOnDestroy() {

  }
}