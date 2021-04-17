import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productRef$: AngularFireList<any>;
  products$: Observable<any[]>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.productRef$ = this.afDatabase.list('/products/');
    this.products$ = this.productRef$.snapshotChanges().pipe(
      map(
        (products) => {
          return products.map(
            (p) => {
              return ({ key: p.key, ...p.payload.val() });
            }
          );
        }
      )
    );
  }

  getAll() {
    return this.products$;
  }

  getById(id: string) {
    return this.afDatabase.object('/products/' + id).valueChanges();
  }

  create(product) {
    return this.productRef$.push(product);
  }

  update(id: string, product) {
    return this.productRef$.update(id, product);
  }

  delete(id: string) {
    return this.productRef$.remove(id)
      .then(() => {
        console.log('Deleted');
      })
      .catch(() => {
        console.log('Error');
      });
  }
}
