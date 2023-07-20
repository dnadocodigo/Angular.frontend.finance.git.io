import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private userAuthenticPort : boolean = false;
  private token: any;
  private user: any;

  constructor(private httpClient: HttpClient) { }

  checkToken(){
     return Promise.resolve(true);
  }

  authenticatedUser(status: boolean){
    localStorage.setItem('userAuthenticPort',JSON.stringify(status));
    this.userAuthenticPort = status
  }

  isUserAuthehticated(): Promise<boolean>{
    this.userAuthenticPort = localStorage.getItem('userAuthenticPort') =="true";
    return Promise.resolve(this.userAuthenticPort)
  }
  setToken(token: string){
    localStorage.setItem('token',token);
    this.token = token;
  }

  get getToken(){
    this.token = localStorage.getItem('token');
    return this.token;
  }

  cleanToken(){
    this.token = null;
    this.user = null;
  }

  dataUserLogged(){
    this.authenticatedUser(false);
    this.cleanToken;
    localStorage.clear();
    sessionStorage.clear();
  }
}

