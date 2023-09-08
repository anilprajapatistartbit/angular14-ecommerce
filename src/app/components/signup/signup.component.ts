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


<<<<<<< Updated upstream
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
  
=======
  // Create a payload with user data
  const userData = {
    firstname: this.signUpForm.value.firstname,
    lastname: this.signUpForm.value.lastname,
    mobile: String(this.signUpForm.value.mobile), // Convert to string if needed
    email: this.signUpForm.value.email,
    password: this.signUpForm.value.password,
    confirmPassword: this.signUpForm.value.confirmPassword,
  };

  // Make a POST request to the API
  this.http.post<any>('https://localhost:7005/api/auth/signup', userData)
    .subscribe(
      (res) => {
        console.log('Response:', res); // Log the response
        this.toastr.success('SignUp Successfully');
        this.signUpForm.reset();
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
>>>>>>> Stashed changes
}
