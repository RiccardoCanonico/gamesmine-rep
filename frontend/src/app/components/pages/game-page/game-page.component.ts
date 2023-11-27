import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  game!: Game;
  constructor(activatedRoute:ActivatedRoute, gameService:GamesService, private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.game = gameService.getGameById(params['id']);
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.game);
    this.router.navigateByUrl('/cart-page');
  }
}

