import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService:CartService, private router:Router, private userService:UserService, private orderService:OrderService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.game.id);
  }

  changeQuantity(cartItem:CartItem, quantityString:string){
    const quantity = parseInt(quantityString);
    this.cartService.changeQuantity(cartItem.game.id, quantity); 
  }

  createDate(){
    let today = new Date();
    let date:string = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return date;
  }

  createOrder(){
    if(this.userService.currentUser.id == undefined){
      this.router.navigateByUrl("/login");
    }

    let userId = this.userService.currentUser.id;
    let totalPrice = this.cart.totalPrice;
    let gameId:number[] = [];

    for(let i = 0; i < this.cart.items.length; i++){
      gameId.push(this.cart.items[i].game.id);
    }
    let date = this.createDate();

    this.orderService.createOrder({userId, totalPrice, gameId, date});
    this.router.navigateByUrl("/payment");
  }
}
