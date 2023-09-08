  import { CanActivateFn } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';

  export const authGuard: CanActivateFn = (route, state) => {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      alert("Not authorized user");
      return false;
    }
    return true;
  };
