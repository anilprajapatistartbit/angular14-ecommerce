import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  defaultCountry: string = 'India';
  defaultgender: string = 'Male';


  gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
    { id: '3', value: 'Other' }
  ];
  orderID: number=0;
  public myForm!: FormGroup;
  public addressData: any;
  selectedAddress: any; 
  constructor(
    private cartService: CartService,
    private apiService: ApiService,
  
    private fb: FormBuilder,
    private addressService: AddressService,
   private toastr:ToastrService,
    private http : HttpClient,
    private auth:AuthService,
    private router:Router
  ) {}

  ngOnInit() {
    

    this.myForm = this.fb.group({
      firstname: ['', Validators.required], 
      lastname: [''], 
      gender: ['', Validators.required],
      country: [''], 
      city: [''], 
      state: [''],
      streetAddress: ['',Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      phone: [''], 
      zipCode: ['',Validators.required] 
    });
    this.addressService.selectedAddress$.subscribe((address) => {
      this.selectedAddress = address;
      console.log(this.selectedAddress);
    })
  }

  

  onSubmit() {
  
   
    const userId=this.auth.getUserId();
    console.log(this.myForm.value);
    console.log(this.myForm.value.country,this.myForm.value.state);

    // this.apiService.createBilling(this.myForm.value).subscribe(
    //   (response) => {
    //     if (response && response.message === 'Billing data saved successfully') {
    //       this.toastr.success('Billing Added Successfully');
    //       localStorage.setItem('billingId', response.billingId.toString());
     
    //       this.myForm.reset();
    //     } else {
    //       console.log('Unexpected response:', response);
    //       alert('Something went wrong');
    //     }
    //   },
    //   (error) => {
    //     console.error('Error saving billing data:', error);
    //     if (error.error && error.error.errors) {
    //       console.log('Validation errors:', error.error.errors);
    //     }
    //     alert('Something went wrong');
    //   }
    // );

    // this.http.post("https://localhost:7005/api/addresses", {
    //   userId:userId,
    //   country: this.myForm.value.country,
    //   state: this.myForm.value.state,
    //   city:this.myForm.value.city,
    //   streetAddress:this.myForm.value.streetAddress,
    //   zipCode:this.myForm.value.zipCode

      
    // }, { responseType: 'text' })
    // .subscribe(
    //   res => {
    //     if (res === 'Address saved successfully') {
    //       this.toastr.success("Address Added Successfully");
      
    //       this.myForm.reset();
    //     } else {
    //       console.log("Unexpected response:", res);
    //       alert("Something went wrong");
    //     }
    //   },
    //   err => {
    //     console.error(err);
    //     if (err.error && err.error.errors) {
    //       console.log("Validation errors:", err.error.errors);
    //     }
    //     alert("Something went wrong");
    //   }
    // );
  
    this.router.navigate(['/useraddress', userId]);
        
     
    
    // Generate PDF
    this.generatePDF(this.myForm.value);
    }
  
    updateBillingForm(selectedAddress: any) {
      this.myForm.patchValue({
        country: selectedAddress.country,
        state: selectedAddress.state,
        city: selectedAddress.city,
        streetAddress: selectedAddress.streetAddress,
        zipCode: selectedAddress.zipCode
      });
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
      Street Address: ${formData.streetAddress}
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