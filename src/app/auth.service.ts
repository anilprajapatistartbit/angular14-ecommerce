import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<any | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {}

  login(user: any): void {
    // Logic to perform login and set loggedInUser
    this.loggedInUserSubject.next(user);
  }

  logout(): void {
    // Logic to clear loggedInUser
    this.loggedInUserSubject.next(null);
  }
}
