import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from './food/food';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiUrl = 'https://localhost:7005/api/Food';
  apiUrlLogin = 'https://localhost:7005/api/Login';
  private loggedInUser: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  login(username: string, password: string): Observable<any> {
    const body = { Username: username, Password: password };
    return this.http.post<any>(this.apiUrlLogin, body);
  }
  logout(): void {
    // Remove the username from local storage
    localStorage.removeItem('username');
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
