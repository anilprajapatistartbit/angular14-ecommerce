import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helper/validationform';
import { NgToastService } from 'ng-angular-popup';
<<<<<<< Updated upstream
import { ToastrService } from 'ngx-toastr';
=======

<<<<<<< Updated upstream
=======
import { ToastrService } from 'ngx-toastr';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
  userName: string | null = null;

>>>>>>> Stashed changes
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
<<<<<<< Updated upstream

  
    private toastr:ToastrService

   

  

=======
<<<<<<< Updated upstream
   
=======
  
    private toastr:ToastrService
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
<<<<<<< Updated upstream

      email: ['', Validators.required],

=======
<<<<<<< Updated upstream
      username: ['', Validators.required],
=======
      email: ['', Validators.required],
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
         
          const tokenPayload = this.auth.decodedToken();
      
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
<<<<<<< Updated upstream

=======
=======
>>>>>>> Stashed changes
          this.toastr.success('Login Success');
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          
          // Set the user's name in the UserStoreService
        
          console.log(res.firstName);
          const tokenPayload = this.auth.decodedToken();
        
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
          this.router.navigate(['home'])
        },
        error: (err) => {
          this.toast.error({ detail: "ERROR", summary: "Something when wrong!", duration: 5000 });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
<<<<<<< Updated upstream


=======
<<<<<<< Updated upstream
=======
  
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}