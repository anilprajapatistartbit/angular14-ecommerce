// address.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private selectedAddressSubject = new BehaviorSubject<any>(null);
  selectedAddress$ = this.selectedAddressSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateBillingDetails(updatedData: any): Observable<any> {
    // Replace 'your-backend-api-endpoint' with the actual URL of your API
    const url = 'https://localhost:7005/api/billing/23'; // Use your specific URL
    return this.http.put(url, updatedData);
  }

  setSelectedAddress(selectedAddress: any) {
    this.selectedAddressSubject.next(selectedAddress);
  }
}
