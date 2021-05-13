import { ShoppingCartItem } from './shopping-cart-item.model';

export class ShoppingCart {
    private itemsMap: { [proudctId: string]: ShoppingCartItem };

    key: string;
    items: ShoppingCartItem[] = [];
    dateCreated: number;

    constructor(
        _key: string,
        _itemsMap: { [proudctId: string]: ShoppingCartItem },
        _dateCreated: number,
    ) {
        this.key = _key;
        this.itemsMap = _itemsMap;
        this.dateCreated = _dateCreated;
        for (let productId in this.itemsMap) {
            this.items.push(this.itemsMap[productId]);
        }
    }

    get totalItemsCounts() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalPriceOfCartItems() {
        let sum = 0;
        for (let productId in this.items) {
            sum += (this.items[productId].quantity * this.items[productId].product.price);
        }
        return sum;
    }

    getIemQuantity(productId: string) {
        if (!this.itemsMap || !this.itemsMap[productId]) {
            return 0;
        }
        return this.itemsMap[productId].quantity || 0;
    }
}