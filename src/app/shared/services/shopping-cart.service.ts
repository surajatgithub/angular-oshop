import { AngularFireList, SnapshotAction, AngularFireObject } from '@angular/fire/database/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCartsRef$: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.shoppingCartsRef$ = this.afDatabase.list('/shopping-carts/');
  }

  async addToCart(product) {
    this.updateProductQuantityInCart(product, 1);
  }

  async removeFromCart(product) {
    this.updateProductQuantityInCart(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.afDatabase.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async getById(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.afDatabase.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map(
        (shoppingCart: SnapshotAction<any>) => {
          let payload = shoppingCart.payload.val();
          return new ShoppingCart(
            shoppingCart.key,
            payload.items,
            payload.dateCreated
          );
        }
      )
    );
  }

  private create() {
    return this.shoppingCartsRef$.push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let shoppingCart = await this.create();
    cartId = shoppingCart.key;
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  private getCartItemProductById(cartId: string, productId: string): AngularFireObject<any> {
    return this.afDatabase.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateProductQuantityInCart(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getCartItemProductById(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(
        (item) => {
          let quantity = (item.payload.val()?.quantity || 0) + change;
          if (quantity === 0) {
            item$.remove();
          } else {
            item$.update({ product: product, quantity: (item.payload.val()?.quantity || 0) + change });
          }
        }
      );
  }
}