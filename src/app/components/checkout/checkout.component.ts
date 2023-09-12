import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  public myForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router:Router
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
  }

  initiateStripePayment() {
    try {
      const total = this.cartService.calculateTotal();
      this.http.post(this.endpoint, { totalPrice: total }).subscribe((response: any) => {
        const sessionUrl = response.sessionurl;
  
        // Use the Router service to navigate to the Stripe Checkout page
        this.router.navigateByUrl(sessionUrl);
      }, (error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  onSubmit() {
    const userId = this.authService.getUserId();
    const cartItems = this.cartService.getCartItems();
    const total = this.cartService.calculateTotal();

    const quantity = this.cartService.calculateQuantity();

    // Create an array to store order objects
    const orders = [];

    // Iterate through cart items and create an order object for each item
    for (const item of cartItems) {
      const order = {
        userId: Number(userId),
        foodId: Number(item.id),
        firstName: this.myForm.get('firstname')?.value,
        quantity: quantity, // Use item.quantity from the cart item
        totalPrice: total
      };

      // Push the order object to the orders array
      orders.push(order);
    }

    console.log('Order Data:', orders);

    // Call the initiateStripePayment method
    this.initiateStripePayment();

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
