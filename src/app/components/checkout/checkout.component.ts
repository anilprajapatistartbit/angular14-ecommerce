import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  defaultCountry: string = 'india';
  defaultgender: string = 'Male';

  apiUrl = 'https://localhost:7005/api/stripe';
  endpoint = `${this.apiUrl}/create-session`;
  gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
    { id: '3', value: 'Other' }
  ];
  orderID: number=0;
  public myForm!: FormGroup;
  id: string | null = null;
  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
   private route:ActivatedRoute,
    private http : HttpClient
  ) {}

  ngOnInit() {
    
    // Initialize the form controls and group them into the FormGroup
    this.myForm = this.fb.group({
      firstname: ['', Validators.required], // First Name with required validation
      lastname: [''], // Last Name
      gender: ['', Validators.required], // Gender with required validation
      country: [''], // Country
      city: [''], // City
      state: [''], // State
      streetName: [''], // Street Address
      email: ['', [Validators.required, Validators.email]], // Email with required and email format validation
      phone: [''], // Phone
      zip: [''] // Zip Code
    });
    this.route.queryParamMap.subscribe(param => {
      this.id = param.get('session_id');
    });
  }
  async initiateStripePayment(cartItems: any[]) {
    try {
      const orderDataList = cartItems.map(item => ({
        totalPrice: item.price ,
        foodName: item.name,
        Quantity: item.quantity,
        foodId:item.id,
        userId:this.authService.getUserId(),

     
      }));
  
      const response: any = await this.http.post(this.endpoint, orderDataList).toPromise();
      const sessionUrl = response.sessionurl;
      window.location.href = sessionUrl;
    } catch (error) {
      console.error(error);
    }
  }
  

  onSubmit() {
  const cartItems=this.cartService.getCartItems();
    const userId = this.authService.getUserId();
    console.log(userId);

    // Get cart items from localStorage
    const cartItemsJson = localStorage.getItem('cartItems');

    if (cartItemsJson) {
      const cartItems = JSON.parse(cartItemsJson);
      console.log(cartItems);
      
      // Prepare the order data
      const orders = [];

      for (const cartItem of cartItems) {
        const order = {
          userId: userId,
          totalPrice: cartItem.price * cartItem.quantity,
        };

        // Push the order object to the orders array
        orders.push(order);
      }

      console.log('Order Data:', orders);

      // Define the API endpoint URL where you want to send the order data
      const apiUrl = 'https://localhost:7005/api/stripe/success/' + this.id;

      // Make an HTTP POST request to your API to send the order data
      this.http.post(apiUrl, { sessionId: this.id, foods: cartItems, userId: userId }).subscribe(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
      }
  


 
 
        
      this.initiateStripePayment(cartItems);
    
    // Generate PDF
    this.generatePDF(this.myForm.value);
    }
  


  generatePDF(formData: any): void {
    const doc = new jsPDF();

    let xOffset = 10;
    let yOffset = 10;

    // Add a title to the PDF
    doc.setFontSize(16);
    doc.text('Invoice', xOffset, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    const billingDetails = `
      Name: ${formData.firstname} ${formData.lastname}
      Country: ${formData.country}
      City: ${formData.city}
      State: ${formData.state}
      Street Address: ${formData.streetName}
      Phone: ${formData.phone}
    `;

    const columnWidth = doc.internal.pageSize.getWidth() / 2 - 15;
    const billingDetailsArray = billingDetails.split('\n');
    const halfLength = Math.ceil(billingDetailsArray.length / 2);
    const leftColumn = billingDetailsArray.slice(0, halfLength).join('\n');
    const rightColumn = billingDetailsArray.slice(halfLength).join('\n');

    doc.text(leftColumn, xOffset, yOffset);
    doc.text(rightColumn, xOffset + columnWidth + 30, yOffset);
    yOffset += Math.max(leftColumn.split('\n').length, rightColumn.split('\n').length) * 12;

    const cartItems = this.cartService.getCartItems();

    doc.setFontSize(14);
    doc.text('Cart Items:', xOffset, yOffset);
    yOffset += 10;

    const columns = ['Item Name', 'Item Price', 'Quantity', 'Subtotal'];

    const data = cartItems.map(item => [
      item.name,
      `Rs. ${item.price.toFixed(2)}`,
      item.quantity,
      `Rs. ${(item.price * item.quantity).toFixed(2)}`
    ]);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    data.push(['Total', '', '', `Rs. ${totalPrice.toFixed(2)}`]);

    autoTable(doc, {
      head: [columns],
      body: data,
      startY: yOffset,
      theme: 'grid',
      margin: { top: 15 },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 }
      }
    });

    doc.save('invoice.pdf');
  }
}