  import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';

  export const authGuard: CanActivateFn = (route, state) => {
    const service = inject(ToastrService)
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      service.warning("Not Authorized User");
      alert("Not authorized user");
      return false;
    }
    return true;
  };
