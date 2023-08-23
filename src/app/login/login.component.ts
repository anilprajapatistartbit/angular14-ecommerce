import { Component } from '@angular/core';
import { FoodService } from '../food.service'; // Update the path based on your file structure
import { Router } from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // username: string = '';
  // password: string = '';
  // loginError: string | null = null;
  
public loginForm!:FormGroup 
  constructor(private foodService: FoodService,private http:HttpClient, private router: Router,
    private formBuilder : FormBuilder) {  this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })} 
// ngOnInit():void{
//   this.loginForm=this.formBuilder.group({
//     email:[''],
//     password:['']
//   })
// }
login(){
this.http.get<any>("http://localhost:3000/signupUsers").subscribe(
  res=>{
    const user=res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    });
    if(user){
      alert("Login Success");
      this.loginForm.reset();
      this.router.navigate(['/home'])
    }else{
      alert("User not found");
    }
  },err=>{
    alert("Something went wrong!")
  }
)
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
