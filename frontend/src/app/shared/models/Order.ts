import { CartItem } from "./CartItem";

export class Order{
    id!:number;
    userId!:number;
    gameId:number[] = [];
    totalPrice!:number;
}