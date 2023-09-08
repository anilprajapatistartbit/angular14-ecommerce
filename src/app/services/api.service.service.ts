import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7005/api/Auth/';
  private baseUrlOrder: string = 'https://localhost:7005/api/Order/';
  private baseUrlBilling: string = 'https://localhost:7005/api/Billing/';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }
  createOrders(orders: any[]): Observable<any> {
    return this.http.post<any>(this.baseUrlOrder, orders);
  }

  // Get a single order by its ID
  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlOrder}${id}`);
  }

  // Get all orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlOrder);
  }
  getOrdersByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlOrder}ByUser/${userId}`);
  }
  createBilling(billingData: any): Observable<any> {
    return this.http.post<any>(this.baseUrlBilling, billingData);
  }
  getBillingByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlBilling}ByUser/${userId}`);
  }
}
