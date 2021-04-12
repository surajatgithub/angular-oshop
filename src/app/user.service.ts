import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

export interface User {
  name: string;
  email: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afDatabase: AngularFireDatabase) {

  }

  save(user: firebase.User) {
    this.afDatabase.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string) {
    return this.afDatabase.object('/user/' + uid).valueChanges();
  }
}
