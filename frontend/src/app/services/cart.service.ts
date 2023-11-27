import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../shared/models/Game';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  
  constructor() { }

  addToCart(game:Game):void{
    let cartItem = this.cart.items.find(item => item.game.id === game.id);
    if(cartItem) return;

    this.cart.items.push(new CartItem(game));
    this.setCartToLocalStorage();
  }

  removeFromCart(gameId:string):void{
    this.cart.items = this.cart.items.filter(item => item.game.id != gameId);
    this.setCartToLocalStorage();
  }

  changeQuantity(gameId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.game.id === gameId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity*cartItem.game.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart')
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}
