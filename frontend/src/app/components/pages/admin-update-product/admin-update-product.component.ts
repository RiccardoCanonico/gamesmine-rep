import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/shared/models/Game';

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css']
})

export class AdminUpdateProductComponent {
  game:Game = {} as Game;
  constructor(private activatedRoute:ActivatedRoute, private gameService:GamesService, private adminService:AdminService, private router:Router){
    activatedRoute.params.subscribe((params) => {
      gameService.getGameById(params['id']).subscribe((serverGame) => {
        this.game = serverGame;
      });
    });
  }
  
  submit(form: NgForm){
    let game:Game = new Game();
    
    let id = this.game.id;
    let name = form.value.name;
    let price = form.value.price;
    let genre = form.value.genre
    let imageUrl = form.value.imageUrl;
    let stars = form.value.stars;
    let description = form.value.description;    

    game["id"] = id;
    game["name"] = name;
    game["price"] = price;
    game["imageUrl"] = imageUrl;
    game["genre"] = genre;
    game["stars"] = stars;
    game["description"] = description;

    this.adminService.updateProduct(game).subscribe(() => {
      this.router.navigateByUrl('/admin/products');
    });
  }
}
