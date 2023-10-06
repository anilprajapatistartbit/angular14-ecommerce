import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = "Grocery List";
  siteName: string = "Easy Grocery";
  cartItemCount: number = 0;
  userName: string | null = null;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    this.authService.getUserDataObservable().subscribe(user => {
      if (user) {
        this.userName = user.firstName;
      } else {
        this.userName = null;
      }
    });
  }
clearCart(){
  this.cartService.clearCart();

}
  logout() {
    this.authService.signOut();
    localStorage.removeItem('cartItems');
    this.userName = null;
  }
  showDropdown: boolean = false;

toggleDropdown(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.showDropdown = !this.showDropdown;
}

reloadPage(): void {
  this.router.navigateByUrl('/about').then(() => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  });
}
// Add the rest of your component code here

}
