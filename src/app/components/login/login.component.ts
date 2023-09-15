import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validationform';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

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
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    private toastr: ToastrService,
    private cartService :CartService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
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
     
    
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          // Success block
          console.log(res.message);
          this.loginForm.reset();
          this.authService.storeToken(res.accessToken);
          
           this.toastr.success("Login Success")
       
          // Redirect to the home page after successful login
          this.router.navigate(['home']);
        },
        error: (err) => {
          // Error block
      this.toastr.error(err?.error?.message || 'An error occurred during login.');
          this.loginForm.reset();
          // Handle any other error-specific logic here
        },
      });
    }
  }
}