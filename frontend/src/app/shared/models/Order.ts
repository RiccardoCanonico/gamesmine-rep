import { CartItem } from "./CartItem";

export class Order{
    id!:number;
    userId!:number;
    games:number[] = [];
    totalPrice!:number;
}