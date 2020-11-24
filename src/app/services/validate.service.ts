import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateEmail(email) {
   /* if(email.includes('admin')) {
      return false
    } else {*/
      return true
    //}
  }
  
  validatePassword(pass) {
    return pass.length >= 5
  }

}
