import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../../shared/user';
import { LoginUser } from '../../shared/loginuser';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nameform: FormGroup;
  credentialsform: FormGroup;
  user: User = { "first_name": "", "last_name": "", "email": "", "password": "" };
  lu: LoginUser = {
    "token": "", "user": {
      "email": "",
      "first_name": "",
      "id": 0,
      "last_name": ""
    }
  };
  loginerrmsg: string;
  signuperrmsg: string;
  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;

  constructor(private _formBuilder: FormBuilder, private auth: AuthenticationService,  private route: ActivatedRoute,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser, this.currentUserSubject);
  }

  ngOnInit() {
    this.initform();
  }

  initform() {
    this.nameform = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
    this.credentialsform = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signup() {
    console.log(this.credentialsform.value);
    console.log(this.nameform.value);
    this.user.first_name = this.nameform.value.first_name;
    this.user.last_name = this.nameform.value.last_name;
    this.user.email = this.credentialsform.value.email;
    this.user.password = this.credentialsform.value.password;
    this.auth.createUser(this.user).subscribe((u) => {
      if (u && u.token) {
        this.lu.token = u.token;
        this.lu.user.email = u.email;
        this.lu.user.first_name = u.first_name;
        this.lu.user.id = u.id;
        this.lu.user.last_name = u.last_name;
        localStorage.setItem('currentUser', JSON.stringify(this.lu));
        this.currentUserSubject.next(this.lu);
        console.log("Signup Returned", u);
        console.log(this.currentUser, this.currentUserSubject);
        this.router.navigate(['/home']);
      }
    },
      error => {
        this.signuperrmsg = error;
        console.log(this.signuperrmsg);
        this.logout();
      });
  }

  login() {
    var logins = { "email": "", "password": "" };
    logins.email = this.credentialsform.value.email;
    logins.password = this.credentialsform.value.password;
    this.auth.loginUser(logins).subscribe((u) => {
      if (u && u.token) {
        localStorage.setItem('currentUser', JSON.stringify(u));
        this.currentUserSubject.next(u);
        console.log("Login Returned", u);
        console.log(this.currentUser, this.currentUserSubject);
        this.router.navigate(['/home']);
      }
    },
      error => {
        this.loginerrmsg = error;
        console.log(this.loginerrmsg);
        this.logout();
      });
    
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
