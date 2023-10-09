import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpassword : ValidatorFn=(control:AbstractControl):ValidationErrors|null=>{
    console.log(control.value);
 let password=control.get('password');
 let confirmPassword=control.get('confirmPassword');
 if(password && confirmPassword && password?.value!=confirmPassword?.value){
    return{
        passwordmatcherror:true
    }
 }
 
    return null;
}