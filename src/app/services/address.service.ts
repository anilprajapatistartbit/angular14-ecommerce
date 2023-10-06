import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private selectedAddress: any;

  constructor() { }

  setSelectedAddress(address: any) {
    this.selectedAddress = address;
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }
}
