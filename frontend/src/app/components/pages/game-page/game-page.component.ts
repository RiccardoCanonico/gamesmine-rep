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
          serverGame.genre = serverGame.genre[0].split(',');            //eseguo split sul campo genre degli oggetti tornati dal server per farlo diventare un array di stringhe
          this.game = serverGame;
        }));
      }
    })
  }

  addToCart(){
    if(this.userService.currentUser.id == undefined){      //con il servizio dedicato all'utente controllo se è stato effettuato un login: se non è stato fatto l'utente viene rimandato alla pagina per effettuarlo grazie alla classe Router
      this.router.navigateByUrl("/login");                              
    }
    else{
      this.cartService.addToCart(this.game);              //se è stato effettuato un login l'utente può aggiungere un gioco al carrello grazie al servizio dedicato a quest'ultimo e successivamente viene rimandato alla pagina apposita
      this.router.navigateByUrl('/cart-page');
    } 
  }
}

