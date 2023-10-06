import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService)
const service1=inject(Router)
  var role=service.getUserRole()
 if(role=='Admin'){
return true;
  
 }else{
  return false;
 }
};