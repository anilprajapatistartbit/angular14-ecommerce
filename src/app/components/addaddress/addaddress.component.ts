import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css']
})
export class AddaddressComponent {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService,
    private router:Router,  private http : HttpClient,   private toastr:ToastrService) {}

  ngOnInit(): void {
    this.createAddressForm();
  }

  createAddressForm() {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      streetAddress: ['', Validators.required],
      zipcode: ['']
    });
  }

  onSubmit() {
    const userId=this.auth.getUserId();
    if (this.addressForm.valid) {
      // Handle form submission here
      console.log(this.addressForm.value);
    } else {
      // Display validation error messages if the form is invalid
      // this.validateAllFormFields(this.addressForm);
    }
    this.router.navigate(['/useraddress', userId]);
        this.http.post("https://localhost:7005/api/addresses", {
      userId:userId,
      country: this.addressForm.value.country,
      state: this.addressForm.value.state,
      city:this.addressForm.value.city,
      streetAddress:this.addressForm.value.streetAddress,
      zipcode:this.addressForm.value.zipcode

      
    }, { responseType: 'text' })
    .subscribe(
      res => {
        if (res === 'Address saved successfully') {
          this.toastr.success("Address Added Successfully");
      
          this.addressForm.reset();
        } else {
          console.log("Unexpected response:", res);
          alert("Something went wrong");
        }
      },
      err => {
        console.error(err);
        if (err.error && err.error.errors) {
          console.log("Validation errors:", err.error.errors);
        }
        alert("Something went wrong");
      }
    );
  }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);

  //     if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     } else {
  //       control.markAsTouched({ onlySelf: true });
  //     }
  //   });
  }
