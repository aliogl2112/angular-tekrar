import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordValidator } from './PasswordValidator';
import { AuthResponse } from '../auth-response.module';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode:boolean=false;
  errorMessage="";
  authResponse:Observable<AuthResponse>;
  constructor(
    private authService:AuthService,
    private router:Router
  ){
  }

  toggleMode(){
    this.isLoginMode?this.isLoginMode=false:this.isLoginMode=true
  }
  handleAuth(form:NgForm){
    if(form.value.repassword){
      if(form.value.password!=form.value.repassword){
        this.errorMessage="Parola bilgileri eşleşmiyor!";
        return;
      }
    }

    if(!this.isLoginMode && PasswordValidator.checkPasswordStrength(form.value.password)){
      this.errorMessage = PasswordValidator.checkPasswordStrength(form.value.password);
      return;
    }
    
    if(this.isLoginMode)
      this.authResponse=this.authService.auth(form.value.email,form.value.password);
    else
      this.authResponse=this.authService.auth(form.value.email,form.value.password,form.value.repassword);

    this.authResponse.subscribe({
      next:()=>{
        this.errorMessage="";
        this.router.navigate(["/"]);
      },
      error:(err)=>this.errorMessage=err
    })
  }
}
