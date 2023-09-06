import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { CartService } from '../../services/cart.service'; // Import your CartService

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  defaultCountry: string = 'india';
  defaultgender: string = 'Male';

  gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
    { id: '3', value: 'Other' }
  ];

  constructor(private cartService: CartService) {}

  onSubmit(form: NgForm) {
    // ... Your form submission logic ...

    // Generate PDF after form submission
    this.generatePDF(form.value);
  }

  generatePDF(formData: any): void {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the starting X and Y coordinates
    let xOffset = 10; // Horizontal position
    let yOffset = 10; // Vertical position

    // Add a title to the PDF
    doc.setFontSize(16);
    doc.text('Invoice', xOffset, yOffset);
    yOffset += 10; // Increase the vertical position

    // Add the billing details to the PDF
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

    // Add a title for cart items
    doc.setFontSize(14);
    doc.text('Cart Items:', xOffset, yOffset);
    yOffset += 10; 

    // Define the table columns
    const columns = ['Item Name', 'Item Price', 'Quantity', 'Subtotal'];

    // Create a table data array from cart items
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

    // Save or open the PDF
    doc.save('invoice.pdf');
  }
}