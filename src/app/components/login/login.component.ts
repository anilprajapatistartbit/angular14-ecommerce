import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validationform';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          // Success block
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);

          // Store user information in localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(res.user));

          const tokenPayload = this.auth.decodedToken();
          this.toastr.success('Login Success');
          this.router.navigate(['home']);
        },
        error: (err) => {
          // Error block
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 5000,
          });
          this.loginForm.reset();
          // Handle any other error-specific logic here
        },
      });
    } else {
      // Validate the form fields if it's not valid
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
  logout() {
    // Clear the user information from localStorage
    localStorage.removeItem('loggedInUser');
  
  
  }
  
}
