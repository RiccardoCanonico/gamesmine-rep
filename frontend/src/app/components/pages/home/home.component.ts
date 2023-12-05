import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  games:Game[] = [];
  constructor(private gameService:GamesService, activatedRoute:ActivatedRoute){
    let gamesObservable:Observable<Game[]>;
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']){
        gamesObservable = this.gameService.getAllGamesBySearch(params['searchTerm']);
      }
      else{
        gamesObservable = gameService.getAll();
      }   
      gamesObservable.subscribe((serverGames) => {
        this.games = serverGames;
      })
    });
  }
  
  ngOnInit(): void { 
  }
}
