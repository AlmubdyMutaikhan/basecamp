import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService : AuthService,
        private router : Router
    ) {

    }

    canActivate() {
        if(this.authService.loggedIn()) {
            return true
        } else {
            console.log("redirecting to login")
            this.router.navigate(['/login'])
            return false
        }
    }
}
