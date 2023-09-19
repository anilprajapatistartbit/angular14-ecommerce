import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressService } from 'src/app/services/address.service';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent {
  public addressData: any;
  selectedAddressIndex: number = -1;
  apiUrl = 'https://localhost:7005/api/stripe';
  endpoint = `${this.apiUrl}/create-session`;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private addressService: AddressService,
    private auth: AuthService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    const userId = this.auth.getUserId();

    if (userId !== null) {
      this.api.getAddressByUser(userId).subscribe(
        (data: any[]) => {
          this.addressData = data;
          console.log("Address data by user ID:", data);
        },
        (error) => {
          console.error('Error fetching address data:', error);
        }
      );
    }
  }

  async initiateStripePayment(cartItems: any[]) {
    try {
      const orderDataList = cartItems.map(item => ({
        totalPrice: item.price,
        foodName: item.name,
        Quantity: item.quantity,
        foodId: item.id,
        userId: this.auth.getUserId(),
      }));

      const response: any = await this.http.post(this.endpoint, orderDataList).toPromise();
      const sessionUrl = response.sessionurl;
      window.location.href = sessionUrl;
    } catch (error) {
      console.error(error);
    }
  }

  OnPay() {
    if (this.selectedAddressIndex !== -1) {
      // Select the address and initiate payment
      const selectedAddress = this.addressData[this.selectedAddressIndex];
      this.addressService.setSelectedAddress(selectedAddress);

      // Get cart items and initiate payment
      const cartItems = this.cartService.getCartItems();

      // Fetch billing details from your service (update with your actual service method)
      this.api.getBilling().subscribe((billingDetails) => {
        if (billingDetails) {
          const updatedData = {
            selectedAddress,
            billingDetails
          };
console.log(updatedData);
          // Assuming you have an API endpoint to update both address and billing details in the database
          this.updateAddressAndBillingDetailsInDatabase(updatedData).subscribe(() => {
            // Once both address and billing details are updated in the database, proceed with payment
            this.initiateStripePayment(cartItems);
          });
        } else {
          alert('Please fill in billing details before proceeding with payment.');
        }
      });
    } else {
      alert('Please select an address before proceeding with payment.');
    }
  }

  onAddressSelect(index: number) {
    this.selectedAddressIndex = index;
  }

  private updateAddressAndBillingDetailsInDatabase(updatedData: any) {
    // Replace 'your-backend-api-endpoint' with the actual URL of your API
    return this.http.put('https://localhost:7005/api/Billing/29', updatedData);
  }
}
