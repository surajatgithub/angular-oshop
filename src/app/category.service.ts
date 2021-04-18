import { AngularFireList } from '@angular/fire/database/database';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesRef$: AngularFireList<any>;
  categories$: Observable<any[]>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.categoriesRef$ = this.afDatabase.list('/categories/');
    this.categories$ = this.categoriesRef$.snapshotChanges().pipe(
      map(
        (categories) => {
          return categories.map(
            (c) => {
              return ({ key: c.key, ...c.payload.val() });
            }
          );
        }
      )
    );
  }

  getAll() {
    return this.categories$;
  }
}
