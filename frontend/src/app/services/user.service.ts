import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/url';
import { USER_REGISTER_URL } from '../shared/constants/url';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

const USER_KEY = 'User';  //chiave utilizzata per modificare l'utente nel localStorage
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())                   //oggetto utilizzato per tornare l'ultimo valore a chi esegue subscribe
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private router:Router, private cartService:CartService){
    this.userObservable = this.userSubject.asObservable();                                          //espongo i dati dell'utente all'esterno del servizio
  }

  public get currentUser(): User{
    return this.userSubject.value;         //prendo l'ultimo valore dello userSubject
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
        next: (user) => {
          this.setUserToLocalStorage(user);     //memorizzo l'utente attuale nel localStorage
          this.userSubject.next(user);          //cambio il valore corrente dello userSubject
        },
        error: () => {
          alert("Email o password sbagliati");
        }
      })
    );
  }

  register(userRegister:IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(tap({
      next: () => {
        alert("Registrazione effettuata con successo");
      },
      error: () => {
       alert("Utente già registrato");
      }
    }));
  }

  logout(){
    this.userSubject.next(new User());                        //imposto lo userSubject con un oggetto utente vuoto
    localStorage.removeItem(USER_KEY);                        //rimuovo l'utente attuale dal localStorage
    this.cartService.clearCart();                             //rimuovo i prodotti dal carrello
    this.router.navigateByUrl('');             
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));     //imposto il localStorage con il nuovo utente
  }

  private getUserFromLocalStorage():User{                     //recupero le informazioni dell'utente dal localStorage    
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson){
      return JSON.parse(userJson) as User;
    }

    return new User();
  }

}
