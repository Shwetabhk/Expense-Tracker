import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { map } from 'rxjs/operators';

import { catchError, retry } from 'rxjs/operators';

import { LoginUser } from  '../../shared/loginuser';
import { BaseURL } from '../../shared/baseurl';
import { HttpMsgService } from '../http-msg/http-msg.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<LoginUser>;
    public currentUser: Observable<LoginUser>;

    constructor(private http: HttpClient,private httpmsg: HttpMsgService ) {
        this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginUser {
        return this.currentUserSubject.value;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

  
    getUser(): Observable<any> {
      return this.http.get(`${BaseURL}/user/`).pipe(catchError( (error)=> { return this.httpmsg.handleError(error);}));
    }
    createUser(data):Observable<any>{
      return this.http.post(`${BaseURL}/user/register/`, data).pipe(catchError( (error)=> { return this.handleErrorSignIn(error);}));
    }
    loginUser(data):Observable<any> {
      return this.http.post(`${BaseURL}/user/api-token-auth/`, data).pipe(catchError( (error)=>{ return this.handleErrorLogIn(error);}));
    }
  
    handleErrorSignIn(error: Response | any) {
      let errMsg: string;
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        errMsg = "Please Wait While We Are Fixing This For You.";
      } 
      else {
        console.error((error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        let e = error.error.email;
        if (e == 'Enter a valid email address.') {
          errMsg = "Enter a valid email address and Try Again!";
        }
        else if(e=='This field must be unique.'){
          errMsg="Email Already Registered. Try Logging In!"
        }
        else{
          errMsg = "Please Enter Valid Details!";
        }
      }
      return throwError(errMsg);;
    }
  
    handleErrorLogIn(error: Response | any) {
      let errMsg: string;
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        errMsg = "Please Wait While We Are Fixing This For You.";
      } 
      else {
        console.error((error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        let e = error.error.non_field_errors;
        if (e == 'Unable to log in with provided credentials.') {
          errMsg = "Email Address or Password is Incorrect. Please Try Again!";
        }
        else{
          errMsg = "Unable to Log you In!";
        }
      }
      return throwError(errMsg);;
    }
  
}