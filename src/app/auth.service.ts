import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.signOut();
  }

  get appUser$() {
    return this.user$
      .pipe(
        switchMap(
          (user: firebase.User) => {
            if (user) {
              return this.userService.get(user.uid);
            }
            return of(null);
          }
        )
      );
  }
}
