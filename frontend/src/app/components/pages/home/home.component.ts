import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  games:Game[] = [];
  @ViewChild('checkPrice') checkPrice!: ElementRef;                   //variabili template per recuperare checkbox
  @ViewChild('checkAlphabet') checkAlphabet!: ElementRef;

  constructor(private gameService:GamesService, activatedRoute:ActivatedRoute){
    let gamesObservable:Observable<Game[]>;                           //variabile observable per recuperare risultati dal server
    activatedRoute.params.subscribe((params) => {                     //eseguo subscribe per recuperare parametri della route
      if(params['searchTerm']){                                       //controllo i parametri della route e in base a questo decido quale richiesta inviare al server
        gamesObservable = this.gameService.getAllGamesBySearch(params['searchTerm']);     //invio una richiesta al server attraverso il servizio appropriato
      }
      else{
        gamesObservable = gameService.getAll();
      }   
      gamesObservable.subscribe((serverGames) => {                   //eseguo subscribe sull'observable per recuperare i dati e definire l'array di prodotti
        this.games = serverGames;
      })
    });
  }

  filterPrice(){                                                    //filtro prodotti in base al prezzo in ordine crescente
    if(this.checkPrice.nativeElement.checked == true){
      this.checkAlphabet.nativeElement.disabled = true;
      this.games = this.games.sort((a, b) => a.price-b.price);
    }
    else{
      window.location.reload();
    }
  }

  filterByAlphabeticalOrder(){                                    //filtro prodotti in ordine alfabetico
    if(this.checkAlphabet.nativeElement.checked == true){
      this.checkPrice.nativeElement.disabled = true;
      this.games = this.games.sort((a, b) => (a.name > b.name)?1:-1);
    }
    else{
      window.location.reload();
    }
  }
}
