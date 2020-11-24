import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import {AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {
  allUsers : object[]
  constructor( private userService : UserService,
               private authService : AuthService,
               private flashMessageService : FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.allUsers = [{
      email : "Loading.."
    }]
    this.getUserAll()
  }

  async getUserAll() {
    try {
      const data = await this.userService.getAllUsers() 
      this.allUsers = data["users"]
      console.log(this.allUsers)
    } catch(err) {
      console.log(err.error.errors)
    }
  }

  is_admin() {
    const data =  this.authService.getPayLoad()
    return data.is_admin
  }

  getUserName() {
    const name = JSON.parse(localStorage.getItem('user'))
    return name.email
  }

  async deleteUser(id, index) {
    if(this.allUsers[index]["is_user"]) {
    try { 
      const res = await this.userService.deleteUser(id)
      this.flashMessageService.show(res["msg"], {cssClass : 'alert-success', timeout : 1000})
      this.allUsers = this.allUsers.filter((item) => {
        return item["_id"] !== id
      })
    } catch(err) {
      console.log(err.message)
      this.flashMessageService.show("Oops, smth went wrong", {cssClass : 'alert-success', timeout : 1000})
    }
  } else {
    this.flashMessageService.show("You can't modify or remove ROOT ADMIN", {cssClass : 'alert-danger', timeout : 1000})
  }
  }

  async updateUser(index, id, name, is_admin) {
    if(this.allUsers[index]["is_user"]) {
      try {
        const res = await this.userService.updateUser(id, is_admin, name)
        this.flashMessageService.show(res["msg"], {cssClass : 'alert-success', timeout : 1000})
        this.allUsers[index]["is_admin"] = is_admin
        console.log(this.allUsers[index])
      } catch(err) {
        console.log(err.message)
        this.flashMessageService.show("Oops, smth went wrong", {cssClass : 'alert-danger', timeout : 1000})
      }
    } else {
      this.flashMessageService.show("You can't modify or remove ROOT ADMIN", {cssClass : 'alert-danger', timeout : 1000})
    }
    
  }




}
