import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { catchError, retry } from 'rxjs/operators';


import { LoginUser } from '../../shared/loginuser';
import { BaseURL } from '../../shared/baseurl';
import { HttpMsgService } from '../http-msg/http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private currentUserSubject: BehaviorSubject<LoginUser>;
  public currentUser: Observable<LoginUser>;

  constructor(private http: HttpClient, private httpmsg: HttpMsgService, ) {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  currentUserValue() {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.currentUserSubject.value.token
      })
    };
    console.log(httpOptions);
    return httpOptions;
  }

  newexpense(data): Observable<any> {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': 'JWT ' + this.currentUserSubject.value.token
      })
    };
    console.log(data.get('name'));
    return this.http.post(`${BaseURL}/expenses/`, data, httpOptions).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  getallexpense(): Observable<any> {
    return this.http.get(`${BaseURL}/expenses/`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  updateexpense(id, data): Observable<any> {
    this.currentUserSubject = new BehaviorSubject<LoginUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT ' + this.currentUserSubject.value.token
      })
    };
    return this.http.put(`${BaseURL}/expenses/${id}/`, data, httpOptions).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  deleteexpense(id): Observable<any> {
    return this.http.delete(`${BaseURL}/expenses/${id}/`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  gettotal(): Observable<any> {
    return this.http.get(`${BaseURL}/expenses/total/`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  sort(id): Observable<any> {
    return this.http.get(`${BaseURL}/expenses/sort/${id}/`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }

  listfilter(): Observable<any> {
    return this.http.get(`${BaseURL}/expenses/filter/`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }
  
  listsearch(data): Observable<any> {
    console.log(data);
    return this.http.get(`${BaseURL}/expenses/search/?query=${data}`, this.currentUserValue()).pipe(catchError((error) => { return this.httpmsg.handleError(error); }));
  }
}
