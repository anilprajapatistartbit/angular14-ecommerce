import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const roleguardGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
const service1=inject(Router)
  var role=service.getUserRole()
 if(role=='Admin'){
   return service1.navigateByUrl('/admindashboard');
  
 }else{
  return true;
 }
};