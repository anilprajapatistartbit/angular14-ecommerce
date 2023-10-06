import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactFormComponent {
  contactForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http:HttpClient,private router: Router,private toastr: ToastrService) 
  {  this.toastr.toastrConfig.positionClass = 'toast-bottom-right'; }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
     
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', Validators.required],
      Message: ['', Validators.required]
    });
  }
  contact() {
    this.http.post("https://localhost:7005/api/contact", this.contactForm.value, { responseType: 'text' })
      .subscribe(
        res => {
          if (res === 'Contact form data saved successfully') {
            this.toastr.success("Contact Added Successfully");
            this.contactForm.reset();
            this.router.navigate(['/home']);
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
}