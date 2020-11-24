import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AuthGuard } from './guards/auth-guard.service'
import { LoginGuard } from './guards/login-guard.service'
import { DisplayUsersComponent } from './components/display-users/display-users.component';
import { ProjectsComponent } from './components/projects/projects.component'
import { SingleprojectComponent } from './components/singleproject/singleproject.component'
const routes: Routes = [
  { path: '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  { path: 'home',
    component : HomeComponent
  },
  { path: 'signup',
    component : SignupComponent
  },
  { path: 'login', component : LoginComponent,
    canActivate : [ LoginGuard ]},
  { path: 'dashboard',
    component : DashboardComponent,
    canActivate : [ AuthGuard ]
  },
  { path: 'user/profile',
    component : ProfileComponent,
    canActivate : [ AuthGuard ]
  },
  {
    path: 'users/all',
    component : DisplayUsersComponent,
    canActivate : [ AuthGuard ]
  },
  {
    path: 'user/projects',
    component : ProjectsComponent,
    canActivate : [ AuthGuard ]
  },
  {
    path: 'user/projects/:name',
    component : SingleprojectComponent,
    canActivate : [ AuthGuard ]
  },
  { path: '**', component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
