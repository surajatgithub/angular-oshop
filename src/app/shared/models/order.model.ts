import { ShoppingCartItem } from './shopping-cart-item.model';
import { Shipping } from './shipping.model';

export class Order {
    userId: string;
    datePlaced: number;
    shipping: Shipping
    items: ShoppingCartItem[];

    constructor(
        _userId,
        _shipping,
        _shoppingCart
    ) {
        this.userId = _userId;
        this.datePlaced = new Date().getTime();
        this.shipping = _shipping;
        this.items = _shoppingCart.items.map((item: ShoppingCartItem) => {
            return {
                product: {
                    imageURl: item.product.imageUrl,
                    price: item.product.price,
                    title: item.product.title
                },
                quantity: item.quantity,
                totalPrice: item.quantity * item.product.price
            };
        })
    }
}