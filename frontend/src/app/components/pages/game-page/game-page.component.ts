import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent {
  game!:Game;
  constructor(activatedRoute:ActivatedRoute, gameService:GamesService, private cartService:CartService, private router:Router, private userService:UserService){
    activatedRoute.params.subscribe((params) => {
      if(params['id']){
        gameService.getGameById(params['id']).subscribe((serverGame => {
          serverGame.genre = serverGame.genre[0].split(','); 
          this.game = serverGame;
        }));
      }
    })
  }

  addToCart(){
    if(this.userService.currentUser.id == undefined){
      this.router.navigateByUrl("/login");
    }
    else{
      this.cartService.addToCart(this.game);
      this.router.navigateByUrl('/cart-page');
    } 
  }
}

