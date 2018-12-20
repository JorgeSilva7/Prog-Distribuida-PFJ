import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

const apiUrl = "http://localhost:3000/auth/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(email: String, password: String): Observable<any> {
    let login = this.http.post(apiUrl+'login',
      {
        "email": email,
        "password" : password
      }, httpOptions);
    return login;
  }

  register(email: String, name: String, lastName: String, password: String): Observable<any> {
    let register = this.http.post(apiUrl+'register',
      {
        "name": name,
        "lastName" : lastName,
        "email" : email,
        "password" : password
      }, httpOptions);
    return register;
  }
}
