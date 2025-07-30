// Тип элемента корзины
import type {Product} from "./product.ts";

export interface CartItem {
    product: Product;
    quantity: number;
}