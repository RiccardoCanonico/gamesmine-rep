import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']){
        this.games = this.gameService.getAllGamesBySearch(params['searchTerm']);
      }
      else{
        this.games = gameService.getAll();
      }
    });
  }
  
  ngOnInit(): void { 
  }
}
