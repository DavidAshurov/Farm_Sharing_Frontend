import type {Farm} from "./farm.ts";

export interface Product {
    category: string,
    title: string,
    description: string,
    amount: number,
    price: number,
    units: string,
    farm: Farm,
    image: string,
}