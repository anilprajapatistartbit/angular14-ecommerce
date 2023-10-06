import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from 'src/app/shared/matchpassword.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: matchpassword
      }
    );



  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.type = 'text') : (this.type = 'confirmpassword');
  }

 

onSubmit() {
  if (this.signUpForm.valid) {
    const signUpData = this.signUpForm.value;

    // Call your AuthService's signup method to make the API request
    this.authService.signup(signUpData).subscribe(
      (res) => {
        // Registration successful
        console.log(res.message);
        // Store the first name in local storage
        localStorage.setItem('firstName', signUpData.firstName);
        this.signUpForm.reset();
       this.toastr.success("SignUp Successfully");
        this.router.navigate(['login']);
      },
      (err) => {
        // Registration failed
        this.toastr.error(err?.error?.message || 'An error occurred during registration.');
      }
    );
  }
}
}

