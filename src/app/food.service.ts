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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedInUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token:', token);
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Payload:', payload);
        return payload.Username;
      } catch (error) {
        console.error('Error decoding token payload:', error);
      }
    }
    return null;
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  login(username: string, password: string): Observable<any> {
    const body = { Username: username, Password: password };
    return this.http.post<any>(this.apiUrlLogin, body);
  }
 
}
