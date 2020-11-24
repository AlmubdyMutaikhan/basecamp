import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService,
              private router : Router,
              private flashMessagesService : FlashMessagesService, 
              private jwthelperService : JwtHelperService
  ) { }

  session : boolean
  token : string

  ngOnInit(): void {
    console.log(this.loggedin())
  }
  
 
  logout() {
      this.flashMessagesService.show("Succesfully, logged out", { cssClass : 'alert-success', timeout : 2000})
      this.authService.logout()
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2900)
  }

  loggedin() {
    const token = this.authService.getToken()
    return !this.jwthelperService.isTokenExpired(token)
  }


}
