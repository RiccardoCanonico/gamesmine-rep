import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SHA256, enc } from 'crypto-js';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  returnUrl = '';
  
  constructor(private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {              //inizializzo la route a cui deve andare dopo la registrazione
    this.returnUrl = "login";
  }
  
  submit(form: NgForm){           
    let email=form.value.email;           //inizializzo i dati inseriti nel form da passare al server 
    let password=form.value.password;
    let name=form.value.name;
    let address=form.value.address;

    password = SHA256(password).toString(enc.Hex);        //la password non viene mandata in chiaro, ma viene prima criptata con un algoritmo di hashing

    this.userService.register({email, password, name, address}).subscribe(() => {             //tramite il servizio eseguo una richiesta al server per inserire l'utente nel dastabase
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
