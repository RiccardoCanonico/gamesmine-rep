import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  returnUrl = '';
  
  constructor(private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  
  submit(form: NgForm){
    let email=form.value.email;
    let password=form.value.password;
    let name=form.value.name;
    let address=form.value.address;

    this.userService.register({email, password, name, address}).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
