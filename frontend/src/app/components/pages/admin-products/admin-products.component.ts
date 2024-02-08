import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  games!:Game[];
  
  constructor(private adminService:AdminService){
    adminService.getAllGamesAdmin().subscribe((serverGames) => {
      this.games = serverGames;
    });
  }

  submit(form: NgForm){
    let game:Game = new Game();
    
    let name = form.value.name;
    let price = form.value.price;
    let genre = form.value.genre;
    let imageUrl = form.value.imageUrl;
    let stars = form.value.stars;
    let description = form.value.description;    

    game["name"] = name;
    game["price"] = price;
    game["imageUrl"] = imageUrl;
    game["genre"] = genre;
    game["stars"] = stars;
    game["description"] = description;

    this.adminService.insertProduct(game).subscribe(() => {
      window.location.reload();
    });
  }
  
  deleteProduct(gameId:number){
    this.adminService.deleteProduct(gameId).subscribe(() => {
      window.location.reload();
    });
  }

  changeProductAvailability(gameId:number){
    this.adminService.changeProductAvailability(gameId).subscribe(() => {
      window.location.reload();
    })
  }
}
