import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7005/api/Auth/';
  private baseUrlOrder: string = 'https://localhost:7005/api/Order/';
  private baseUrlBilling: string = 'https://localhost:7005/api/Billing/';
  private firstnameSubject = new BehaviorSubject<string>('');
  private cartLocked = false;
  private cartLockTimer: any;
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
  setFirstname(firstname: string) {
    this.firstnameSubject.next(firstname);
  }
  
  getFirstname(): Observable<string> {
    return this.firstnameSubject.asObservable();
  }
  lockCart(): void {
    this.cartLocked = true;
  }

  unlockCart(): void {
    this.cartLocked = false;
  }

  isCartLocked(): boolean {
    return this.cartLocked;
  }


  startCartLockTimer(userId: string): void {
    // Periodically check with the server if the user's session is still active
    this.cartLockTimer = setInterval(() => {
      this.http.get(`/api/checkSession/${userId}`).subscribe(
        (response: any) => {
          if (!response.sessionActive) {
            // The user's session has expired, unlock the cart
            this.unlockCart();
            clearInterval(this.cartLockTimer);
          }
        },
        (error) => {
          console.error('Error checking session:', error);
        }
      );
    }, 60000); // Check every 60 seconds (adjust as needed)
  }

  stopCartLockTimer(): void {
    clearInterval(this.cartLockTimer);
  }
}
