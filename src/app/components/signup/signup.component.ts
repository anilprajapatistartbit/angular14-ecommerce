import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validationform';
import { Router } from '@angular/router';
import { matchpassword } from 'src/app/shared/matchpassword.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
public signUpForm !: FormGroup
constructor(private formBuilder : FormBuilder,private authService: AuthService, private http:HttpClient,private router: Router,private toastr: ToastrService){
  this.signUpForm=this.formBuilder.group({
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



  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router,private toastr:ToastrService) { }


  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
    
      email:['', Validators.required],
      password:['', Validators.required],
      confirmpassword: ['', Validators.required],
    }),{
      validators: matchpassword
    }
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
    this.isText ? this.type = 'text' : this.type = 'confirmpassword'
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const signUpData = this.signUpForm.value;

      // Call your AuthService's signup method to make the API request
      this.authService.signup(signUpData).subscribe(
        (res) => {
          // Registration successful
          console.log(res.message);
          this.toastr.success('Registration successful', 'Success');
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          // Registration failed
          console.error(err?.error?.message || 'An error occurred during registration.');
          this.toastr.error('Registration failed', 'Error');

    });
  }
  

}
