import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7005/api/auth/';
  private userPayload: any;
  private userDataSubject = new BehaviorSubject<any>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signup(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  signIn(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      tap((res) => {
        if (res && res.accessToken) {
          this.storeToken(res.accessToken);
  
          this.userDataSubject.next(res); // Update the subject immediately
  
          // Also, set the username in localStorage
          localStorage.setItem('userName', res.firstName);
  
          this.userIdSubject.next(res.userId);
          localStorage.setItem('loggedInUser', JSON.stringify(res));
        }
      })
    );
  }
  
  getUserDataObservable(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
  getUserIdObservable(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken() || '';
    return jwtHelper.decodeToken(token);
  }

 
  getUserId(): number | null {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser);
      return userObject.userId;
    }

    return null;
  }

  getUserRole(): string | null {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser);
      return userObject.role;
    }

    return null;
  }
  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }
}