import { Component } from '@angular/core';
import { FoodService } from '../food.service'; // Update the path based on your file structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private foodService: FoodService, private router: Router) {} // Add the Router service to the constructor

  login(): void {
    this.foodService.login(this.username, this.password).subscribe(
      response => {
        const token = response.Token;
        console.log('Logged in successfully');

        this.router.navigate(['home']);
      },
      error => {
       
        alert('Login failed');
      }
    );
  }
}
