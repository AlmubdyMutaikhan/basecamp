import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient,
               private authService : AuthService        
    ) {}

  getAllUsers() {
    console.log(this.authService.getPayLoad())
    return this.http.get('http://localhost:3000/user/all-users').toPromise()
  }

  deleteUser(id) {
    return this.http.delete(`http://localhost:3000/user/delete/${id}`).toPromise()
  }

  clearUser() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }

  updateUser(id, is_admin, name) {
    return this.http.get(`http://localhost:3000/user/update/${id}/${is_admin}/${name}`).toPromise()
  }

  addProject(id, title) {
    return this.http.post(`http://localhost:3000/user/projects/add/${id}`, { title : title }).toPromise()
  }

  loadProjects(id) {
    return this.http.get(`http://localhost:3000/user/projects/all/${id}`).toPromise()
  }

}
