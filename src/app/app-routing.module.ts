import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'login-signup',     component: LoginComponent },
  { path: 'footer',     component: FooterComponent },
  { path: 'header',     component: HeaderComponent },
  { path: '', redirectTo: '/login-signup', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
