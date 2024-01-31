import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SHA256, enc } from 'crypto-js';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  returnUrl = '';
  
  constructor(private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  
  submit(form: NgForm){
    let email=form.value.email;
    let password=form.value.password;

    password = SHA256(password).toString(enc.Hex); 
    console.log(password);
    
    this.userService.login({email, password}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
