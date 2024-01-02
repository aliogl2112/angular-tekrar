import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { AuthResponse } from "./auth-response.module";
import { AuthErrorHandler } from "./auth/AuthErrorHandler";
import { User } from "./user.module";

@Injectable({
    providedIn:'root'
  })

export class AuthService{
    apiKey="AIzaSyDqhptNSzRn1JXEj2mh-_G7wn83VSk0Wdk";
    signUpUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqhptNSzRn1JXEj2mh-_G7wn83VSk0Wdk";
    signInUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqhptNSzRn1JXEj2mh-_G7wn83VSk0Wdk";

    user = new BehaviorSubject<User|null>(null);

    constructor(
        private http:HttpClient
    ){}

    auth(email:string,password:string,repassword?:string):Observable<AuthResponse>{
        let response:Observable<AuthResponse>
        if(repassword){
            return this.http.post<AuthResponse>(this.signUpUrl,{
                email:email,
                password:password,
                returnSecureToken:true
            }).pipe(
                tap(data=>{
                    this.handleUser(data.email,data.localId,data.idToken,data.expiresIn);
                }),
                catchError(this.handleError)
            )
        }
        else{
            return this.http.post<AuthResponse>(this.signInUrl,{
                email:email,
                password:password,
                returnSecureToken:true
            }).pipe(
                tap(user=>{
                    this.handleUser(user.email,user.localId,user.idToken,user.expiresIn);
                }),
                catchError(this.handleError)
            )
        }

    }
    autoLogin(){
        if(!localStorage.getItem("user"))
            return;

        const user = JSON.parse(localStorage?.getItem("user") || "{}");
        const loadedUser=new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate));

        if(loadedUser.token)
            this.user.next(loadedUser);
    }
    
    logout(){
        this.user.next(null);
        localStorage.removeItem("user");
    }

    private handleError(err:HttpErrorResponse){
        let error=AuthErrorHandler.errorHandler(err.error.error.message)
        return throwError(()=>error)
    }
    private handleUser(email:string,localId:string,idToken:string,expiresIn:string){
        const expirationDate=new Date(new Date().getTime() + (+expiresIn*1000))//getTime fonksiyonu şu anki tarihin ms bilgisini getirir.
        //expiresIn saniye cinsinden geldiği için 1000 ile çarparak milisaniyeye çeviriyoruz. başa + eklemek değeri number türüne çevirir. Number(data.expiresIn) şeklinde de yazılabilir
        const user = new User(
            localId,
            email,
            idToken,
            expirationDate
            )
        this.user.next(user);
        localStorage.setItem("user",JSON.stringify(user))
    }
}
