import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { Observable, tap } from "rxjs";
import { ADMIN_DELETE_PRODUCT, ADMIN_GET_USERS_URL, ADMIN_INSERT_PRODUCT, ADMIN_UPDATE_PRODUCT, GAMES_URL, USER_ORDER_ADMIN_URL } from "../shared/constants/url";
import { User } from "../shared/models/User";
import { Game } from "../shared/models/Game";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private http:HttpClient){}
    
    getAllOrdersAdmin():Observable<Order[]>{
        return this.http.get<Order[]>(USER_ORDER_ADMIN_URL);
    }

    getAllUsersAdmin():Observable<User[]>{
        return this.http.get<User[]>(ADMIN_GET_USERS_URL);
    }

    getAllGames():Observable<Game[]>{
        return this.http.get<Game[]>(GAMES_URL);
    }

    insertProduct(game:Game):Observable<Game>{
        return this.http.post<Game>(ADMIN_INSERT_PRODUCT, game).pipe(tap({
            next: () => {
                alert("Prodotto inserito con successo");
              },
            error: () => {
                alert("Prodotto già esistente");
            }
        }));
    }

    deleteProduct(gameId:number):Observable<string>{
        return this.http.delete<string>(ADMIN_DELETE_PRODUCT + gameId);
    }

    updateProduct(game:Game):Observable<Game>{
        return this.http.put<Game>(ADMIN_UPDATE_PRODUCT + game.id, game);
    }
}