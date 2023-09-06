import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedInUser: any | null = null;
  public loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      () => {
        this.toastr.success("Login Success");
        this.loginForm.reset();
        this.router.navigate(['/home']);
        this.cartService.getCartItemsFromLocalStorage();
      },
      () => {
        this.toastr.error("Email and Password are incorrect");
      }
    );
  }
}
