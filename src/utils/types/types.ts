import type {Offer} from "./offerTypes.ts";

export interface CartItem {
    id: number,
    offer: Offer,
    quantity: number,
}

export type imageUploaderState =
    { type: 'unchanged' } |
    { type: 'removed' } |
    { type: 'new', file: File, preview: string }