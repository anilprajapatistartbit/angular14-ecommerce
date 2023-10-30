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
  defaultCountry: string = 'India';
  defaultState: string = 'Rajasthan';
  constructor(private fb: FormBuilder, private auth:AuthService,
    private router:Router,  private http : HttpClient,   private toastr:ToastrService) {
      this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    }

  ngOnInit(): void {
    this.createAddressForm();
  }

  createAddressForm() {
    this.addressForm = this.fb.group({
      country: [this.defaultCountry, Validators.required],
      state: [this.defaultState, Validators.required],
      city: ['', Validators.required],
      zipcode: ['',[Validators.required,Validators.minLength(6)]],
      streetAddress: ['', Validators.required]
     
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
    this.http
    .post("https://localhost:7005/api/addresses", {
      userId: userId,
      country: this.addressForm.value.country,
      state: this.addressForm.value.state,
      city: this.addressForm.value.city,
      streetAddress: this.addressForm.value.streetAddress,
      zipcode: this.addressForm.value.zipcode.toString()

    }, { responseType: 'text' })
    .subscribe(
      () => {
        this.toastr.success("Address Added Successfully");
        this.addressForm.reset();
        this.router.navigate(['/checkout']);
      },
      (err) => {
        if (err.error && err.error.Message) {
          this.toastr.error(err.error.Message);
        } else {
          this.toastr.error("Something went wrong.");
        }
        console.error(err);
      }
    );
  


  }
}
