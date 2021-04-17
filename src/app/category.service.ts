import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private afDatabase: AngularFireDatabase) {

  }

  getCategories(): Observable<unknown[]> {
    return this.afDatabase.list('/categories').snapshotChanges();
  }
}
