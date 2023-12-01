import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  defaultCountry: string = 'India';
  defaultGender: string = 'Male';
  cartItems: Food[] = [];
  gender = [
    { id: 'male', value: 'Male' },
    { id: 'female', value: 'Female' },
    { id: 'other', value: 'Other' }
  ];
  
  public myForm!: FormGroup;
  public addressData!: any[];
  selectedAddress: any;
  apiUrl = 'https://localhost:7005/api/stripe';
  endpoint = `${this.apiUrl}/create-session`;


  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private fb: FormBuilder,

    private toastr: ToastrService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
    this.cartItems = this.cartService.getCartItems();

    // Fetch user addresses here
    this.fetchUserAddresses();
  }

  fetchUserAddresses() {
    const userId = this.auth.getUserId();
    if (userId !== null) {
      this.apiService.getAddressByUser(userId).subscribe(
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
  getGrandTotal() {
    let sum = 0;
    for (const item of this.cartItems) {
      sum += item.quantity * item.price;
    }
    return sum;
  }
  onAddressSelected(selectedAddress: any) {
  
    console.log("Selected address:", selectedAddress);


    
    this.selectedAddress = selectedAddress;
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
  getShippingCharge(): number | string {
    const total = this.getTotalPrice();
  
    if (total < 500 && total >200) {
      return (total * 0.02).toFixed(2);
    } else if (total >= 500) {
      return (total * 0.05).toFixed(2);
    } else {
      return 0;
    }
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  getvaluewithshipping(): string {
    const shippingCharge = Number(this.getShippingCharge());
    const grandTotal = Number(this.getGrandTotal());
    const taxCharge = Number(this.calculatePriceWithTax()); // Add this line
  
    if (shippingCharge !== 0) {
      const totalValue = shippingCharge + grandTotal + taxCharge; // Include taxCharge
      return totalValue.toFixed(2);
    } else {
      return (grandTotal + taxCharge).toFixed(2); // Include taxCharge
    }
  }
  calculatePriceWithTax() : number | string{
    const total = this.getTotalPrice() 
    const taxAmount = total * (6 / 100); //gst rate is 12 in fruits and veggies
    return taxAmount;
  }
  onSubmit() {
    const cartItems=this.cartService.getCartItems();
    if (!this.addressData || this.addressData.length === 0) {

      this.router.navigate(['/addaddress']);
      return;
    }
  
    if (!this.selectedAddress) {
 
      this.toastr.success('Please select an address before submitting.');
      return; 
    }
    const billingAddress = this.mapAddressToBilling(this.selectedAddress);

    
    const formData = {
      ...this.myForm.value,
      ...billingAddress 
    };
console.log(formData);
    // Send formData to the server
    this.apiService.createBilling(formData).subscribe(
      (response) => {
        if (response && response.id) { // Assuming 'id' is the property representing the billing details ID
        
          // Extract the billingId and store it in local storage
          const billingId = response.id;
          localStorage.setItem('billingId', billingId.toString());
    
          // You can now retrieve it later using localStorage.getItem('billingId')
           
          // this.initiateStripePayment(cartItems);
          this.myForm.reset();
        } else {
          console.log('Unexpected response:', response);
          this.toastr.success('Billing Added Successfully');
          
        }
      },
      (error) => {
        // Handle any error here
        console.error('Error:', error);
        alert('An error occurred while adding billing data');
      }
    );
    
    }
    onPlaceOrder() {
    
  
      const cartItems = this.cartService.getCartItems();
  
      if (!this.selectedAddress) {
        this.toastr.warning('Please select an address before placing an order.');
        return;
      }
  
   
      this.initiateStripePayment(cartItems);
      this.cartService.removeFromCart;
    }
  
  private mapAddressToBilling(address: any): any {
    return {
      country: address.country,
      state: address.state,
      city: address.city,
      streetAddress: address.streetAddress,
      zipCode: address.zipCode
    };
  }
}
