import { CartItem } from "./CartItem";

export class Order{
    id!:number;
    userId!:number;
    totalPrice!:number;
    name?:string;
    imageUrl?:string;
}