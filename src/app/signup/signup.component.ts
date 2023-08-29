import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchpassword } from '../matchpassword.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
public signupForm !: FormGroup
constructor(private formBuilder : FormBuilder, private http:HttpClient,private router: Router,private toastr: ToastrService){
  this.signupForm=this.formBuilder.group({
    firstname:['', Validators.required],
    lastname:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
   
  },{
    validators: matchpassword
  })
}

signUp(){
this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
.subscribe(res =>{
  this.toastr.success("SignUp Successfully");
  this.signupForm.reset();
  this.router.navigate(['/login'])
},err=>{
  alert("Something went wrong");
})
}
}
