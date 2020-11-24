import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : String
  password : String

  constructor(  private validateService : ValidateService,
                private flashMessagesService : FlashMessagesService,
                private authService : AuthService,
                private router : Router,
                private cookiService : CookieService
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      email : this.email.toLowerCase(),
      password : this.password
    }
    
    this.authService.authenticateUser(user)
      .then(data => {
        //this.cookiService.set('jwt', data["token"], 60*60*60*24)
        localStorage.setItem('jwt', data["token"])
        console.log(data["user"])
        localStorage.setItem('user', JSON.stringify(data["user"]))
        this.flashMessagesService.show("Succesfully signed up, You will be redirected to a main page", {cssClass : 'alert-success', timeout : 3000})
        setTimeout(()=> {
          this.router.navigate(['/'])
        }, 2900)
      })
      .catch(err => {
        const emailError = err.error.errors.email
        const passwordError = err.error.errors.password
        if(emailError) {
          this.flashMessagesService.show(`${emailError}`, {cssClass : 'alert-warning', timeout : 3000})
        } else if(passwordError) {
          this.flashMessagesService.show(`${passwordError}`, {cssClass : 'alert-warning', timeout : 3000})
        } else {
          this.flashMessagesService.show("Oops, Smth went wrong, Try again" , { cssClass : 'alert-warning', timeout : 3000})  
        }
      })
  }

}
