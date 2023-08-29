import { Component, EventEmitter } from '@angular/core';
import { FoodService } from '../food.service'; // Update the path based on your file structure
import { Router } from '@angular/router';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';
  // loginError: string | null = null;
  loggedInUser: any | null = null; 
public loginForm!:FormGroup 
  constructor(  private authService: AuthService,private foodService: FoodService,private http:HttpClient, private router: Router,
    private formBuilder : FormBuilder,private toastr: ToastrService,private cartService:CartService) 
    {  this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })} 
// ngOnInit():void{
//   this.loginForm=this.formBuilder.group({
//     email:[''],
//     password:['']
//   })
// }
updateLoggedInUser(): void {
  const userString = localStorage.getItem('loggedInUser');
  this.loggedInUser = userString ? JSON.parse(userString) : null;
  console.log('Updated loggedInUser:', this.loggedInUser);
}
login() {
  this.http.get<any>("http://localhost:3000/signupUsers").subscribe(
    res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        
      }

      if (user) {
        this.toastr.success("Login Success");
        this.loginForm.reset();
        try {
          this.router.navigate(['/home']);
        } catch (navError) {
          console.error('Navigation error:', navError);
        }
      } else {
        this.toastr.error("Email and Password are incorrect");
      }
      this.cartService.getCartItemsFromLocalStorage();
    }
  );
}


  // Inside your login component
// login(): void {
//   this.foodService.login(this.username, this.password).subscribe(
//     response => {
//       const token = response.Token;
//       localStorage.setItem('token', token); // Store the token in local storage
//       console.log('Logged in successfully');
//       this.router.navigate(['/home']);
//     },
//     error => {
//       alert('Login failed');
//     }
//   );
// }

}
