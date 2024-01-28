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

  createOrder(){
    if(this.userService.currentUser.id == undefined){
      this.router.navigateByUrl("/login");
    }
    
    const newOrder = new Order();
    newOrder["userId"] = this.userService.currentUser.id;
    newOrder["totalPrice"] = this.cart.totalPrice;
    for(let i = 0; i < this.cart.items.length; i++){
      newOrder["gameId"].push(this.cart.items[i].game.id);
    }

    this.orderService.createOrder(newOrder);
    this.router.navigateByUrl("/payment");
  }
}
