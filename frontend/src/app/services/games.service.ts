import { Injectable } from '@angular/core';
import { Game } from '../shared/models/Game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GAMES_BY_ID, GAMES_BY_SEARCH_URL, GAMES_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  constructor(private http:HttpClient) { }
  
  getAll():Observable<Game[]>{
    return this.http.get<Game[]>(GAMES_URL);
  }

  getAllGamesBySearch(searchTerm:string){
    return this.http.get<Game[]>(GAMES_BY_SEARCH_URL + searchTerm);
  }

  getGameById(gameId:string):Observable<Game>{
    return this.http.get<Game>(GAMES_BY_ID + gameId)
  }
}
