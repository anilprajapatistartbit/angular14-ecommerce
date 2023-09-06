import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchpassword } from '../../shared/matchpassword.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
public signupForm !: FormGroup
constructor(private formBuilder : FormBuilder,private authService: AuthService, private http:HttpClient,private router: Router,private toastr: ToastrService){
  this.signupForm=this.formBuilder.group({
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    mobile:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
   
  },{
    validators: matchpassword
  })
}

signUp() {

  // Create a payload with user data
  const userData = {
    firstname: this.signupForm.value.firstname,
    lastname: this.signupForm.value.lastname,
    mobile: String(this.signupForm.value.mobile), // Convert to string if needed
    email: this.signupForm.value.email,
    password: this.signupForm.value.password,
    confirmPassword: this.signupForm.value.confirmPassword,
  };

  // Make a POST request to the API
  this.http.post<any>('https://localhost:7005/api/auth/signup', userData)
    .subscribe(
      (res) => {
        console.log('Response:', res); // Log the response
        this.toastr.success('SignUp Successfully');
        this.signupForm.reset();
        this.router.navigate(['/login']);
        this.onRegistrationSuccess(userData);
      },
      (err) => {
        console.error('Error:', err); // Log the error
        if (err.error && err.error.errors) {
          console.log('Validation errors:', err.error.errors);
        }
        this.toastr.error('Something went wrong');
      }
    );
}
onRegistrationSuccess(signupFormData: any): void {
  // You can implement logic here to store the signup form data
  // (e.g., save it to local storage, send it to the server, etc.)
  // For example, storing it in local storage:
  localStorage.setItem('signupFormData', JSON.stringify(signupFormData));
}
}