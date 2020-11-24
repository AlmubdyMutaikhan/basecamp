import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'
import {JwtHelperService} from '@auth0/angular-jwt';
import jwt_decode  from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http : HttpClient,
    private cookieService : CookieService,
    private jwthelperService : JwtHelperService
    ) {
  }

  registerUser(user) {
    let header = new HttpHeaders()
    header.append('Content-Type','application/json')
    return this.http.post('http://localhost:3000/user/signup', user, {headers : header}).toPromise()
  }

  authenticateUser(user) {
    let header = new HttpHeaders()
    header.append('Content-Type','application/json')
    return this.http.post('http://localhost:3000/user/signin', user, {headers : header}).toPromise()
  }

  logout() {    
    localStorage.removeItem('jwt')
  }
  
  getToken() {
     return localStorage.getItem('jwt')
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        console.log(Error.message)
        return null;
    }
  }

  loggedIn() {
    const token = this.getToken()
    return !this.jwthelperService.isTokenExpired(token)
  }

  getPayLoad() {
    const token = this.getToken()
    const decodedToken = this.jwthelperService.decodeToken(token)
    return decodedToken
  }

 
}
