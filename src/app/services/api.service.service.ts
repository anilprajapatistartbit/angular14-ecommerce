import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7005/api/Auth/';
  private baseUrlOrder: string = 'https://localhost:7005/api/Order/';
  private baseUrlBilling: string = 'https://localhost:7005/api/Billing/';
  private baseUrlAddress:string='https://localhost:7005/api/addresses/';
  private baseUrlNewsletter:string='https://localhost:7005/api/Newsletter';
  private firstnameSubject = new BehaviorSubject<string>('');
  private selectedAddress: any;
  apiUrlFood = 'https://localhost:7005/api/Food';
  constructor(private http: HttpClient) {}
  setSelectedAddress(address: any) {
    this.selectedAddress = address;
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }
  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
  createOrders(orders: any[]): Observable<any> {
    return this.http.post<any>(this.baseUrlOrder, orders);
  }


  getOrderDetails(orderId: number): Observable<any> {
    const url = `${this.baseUrlOrder}getorderdetails/${orderId}`;
    return this.http.get(url);
  }

  
  getOrder(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}GetOrder`);
  }
  getAddress():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrlAddress}`);
  }
  getAddressByUser(userId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrlAddress}byUserId/${userId}`);
  }
  getOrdersByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}ByUser/${userId}`);
  }
  createBilling(billingData: any): Observable<any> {
    return this.http.post<any>(this.baseUrlBilling, billingData);
  }
  getBilling(): Observable<any> {
    return this.http.get<any>(this.baseUrlBilling);
  }
  setFirstname(firstname: string) {
    this.firstnameSubject.next(firstname);
  }
  
  getFirstname(): Observable<string> {
    return this.firstnameSubject.asObservable();
  }
  createNewsletter(email: any): Observable<any> {
    return this.http.post<any>(this.baseUrlNewsletter, email);
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
