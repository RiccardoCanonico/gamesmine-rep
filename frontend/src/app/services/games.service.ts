import { Injectable } from '@angular/core';
import { Game } from '../shared/models/Game';
import { sample_games } from 'src/data';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  constructor() { }
  getAll():Game[]{
    return sample_games;
  }

  getAllFoodsBySearch(searchTerm:string){
    return this.getAll().filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase())); 
  }

  getFoodById(gameId:string):Game{
    return this.getAll().find((game) => game.id == gameId) ?? new Game();
  }
}
