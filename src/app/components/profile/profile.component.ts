import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private userService : UserService,
               private authService : AuthService,
               private flashMsg : FlashMessagesService,
               private router : Router
    ) { }
  user : object

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }

  async onSubmit() {
  }

  async deleteUser() {
    const data = this.authService.getPayLoad()
    const id = data.id
    try { 
      const res = await this.userService.deleteUser(id) 
      this.flashMsg.show("Good bye, great user...", {cssClass : 'alert-success', timeout : 2000})
      this.userService.clearUser()
      this.router.navigate(['/home'])
    }
    catch(err) {
      this.flashMsg.show("Try again", {cssClass : 'alert-danger', timeout : 2000})
    }
    
  }

}
