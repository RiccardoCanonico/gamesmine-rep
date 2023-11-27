import { Game } from "./Game";

export class CartItem{
    constructor(public game:Game){
    }
    quantity:number = 1;
    price:number = this.game.price;
}