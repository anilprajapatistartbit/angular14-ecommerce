import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiUrl = 'https://localhost:7005/api/Food';
  apiUrlLogin = 'https://localhost:7005/api/Login';
   apiUrlFood = 'https://localhost:7005/api/Food';

  private loggedInUser: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}

 
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
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrlFood}/GetFoods`);
  }

  getFood(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrlFood}/GetFood/${id}`);
  }

  createFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.apiUrlFood}/AddFoodWithImages`, food);
  }

  // updateFood(food: Food): Observable<Food> {
  //   return this.http.put<Food>(`${this.apiUrlFood}/UpdateFood/${food.id}`, food);
  // }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlFood}/DeleteFood/${id}`);
  }

 
  // getFoods(): Observable<Food[]> {
  //   return this.http.get<Food[]>(this.apiUrl);
  // }
  getFoodDetail(id: number): Observable<Food> {
    // const url = `${this.apiUrl}/${id}`;
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }
  
  login(username: string, password: string): Observable<any> {
    const body = { Username: username, Password: password };
    return this.http.post<any>(this.apiUrlLogin, body);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }
}
