import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

   apiUrlFood = 'https://localhost:7005/api/Food';


  constructor(private http: HttpClient, private router: Router) {}

 
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrlFood}/GetFoods`);
  }

  getFood(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrlFood}/GetFood/${id}`);
  }

  createFood(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.apiUrlFood}/AddFoodWithImages`, food);
  }

  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlFood}/DeleteFood/${id}`);
  }
updateFood(id: number, food: Food): Observable<Food> {
return this.http.put<Food>(`${this.apiUrlFood}/UpdateFood/${id}`,food)
}
updateFoodImages(foodId: number, imageUrls: string[]): Observable<any> {
  const updateImagesUrl = `${this.apiUrlFood}/UpdateFoodImages/${foodId}/images`;
  return this.http.put(updateImagesUrl, { images: imageUrls });
}
getFruits(): Observable<Food[]> {
  return this.http.get<Food[]>(`${this.apiUrlFood}/GetFruits`);
}
getVeggies(): Observable<Food[]> {
  return this.http.get<Food[]>(`${this.apiUrlFood}/GetVeggies`);
}
  

}
