import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  email : String
  password : String

  constructor(private validateService : ValidateService, private flashMessagesService : FlashMessagesService,
    private authService : AuthService,
    private router : Router,
    private cookiseService : CookieService
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      email : this.email.toLowerCase(),
      password : this.password
    }

    if(!this.validateService.validateEmail(user.email)) {
      console.log("Aye, bro, email can not include admin")
      this.flashMessagesService.show("Aye, email can not include admin", {cssClass : 'alert-danger', timeout : 3000})
    } else if(!this.validateService.validatePassword(user.password)) {
        console.log("password should be more than 5")
        this.flashMessagesService.show("Aye, Password should be more that 5", {cssClass : 'alert-danger', timeout : 3000})
    } else {
      this.authService.registerUser(user).then(data => {
       // this.cookiseService.set('jwt', data["token"], 60*60*60*24)
       localStorage.setItem('jwt', data["token"]) 
       //console.log(data["msg"])
       console.log(data["user"])
       localStorage.setItem('user', JSON.stringify(data["user"]))
        //console.log(data["token"])
        this.flashMessagesService.show("Succesfully signed up, You will be redirected to a main page", {cssClass : 'alert-success', timeout : 3000})
        setTimeout(()=>{
          this.router.navigate(['/'])
        }, 3000)
      })
      .catch(err => {
        console.log(err.error.errors)
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
}
