import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  game!: Game;
  constructor(activatedRoute:ActivatedRoute, gameService:GamesService){
    activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.game = gameService.getFoodById(params['id']);
      }
    })
  }
}
