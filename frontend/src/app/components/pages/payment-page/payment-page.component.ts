import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { GAMES_URL } from 'src/app/shared/constants/url';
import { Cart } from 'src/app/shared/models/Cart';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  cart!:Cart;
  constructor(private cartService:CartService, private orderService:OrderService, private router:Router){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  insertOrder(){          //funzione che tramite il servizio esegue una richiesta al server per inserire l'ordine nel database
    this.orderService.insertOrder().subscribe(() => {
      this.cartService.clearCart();               //dopo che la funzione ha ritornato tutti i dati rimuovo i prodotti dal carrello e rimando l'utente alla home
      this.router.navigateByUrl('');
    });
  }
}
