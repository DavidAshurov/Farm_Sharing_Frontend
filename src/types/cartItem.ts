// Тип элемента корзины
import type {Offer} from "./offer.ts";

export interface CartItem {
    product: Offer;
    quantity: number;
}