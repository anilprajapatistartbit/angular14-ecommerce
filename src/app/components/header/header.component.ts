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
  loggedInUser: any = null;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    // Use the getUserDataObservable from AuthService to update loggedInUser and userName
    this.authService.getUserDataObservable().subscribe(user => {
      if (user) {
        this.loggedInUser = user;
        this.userName = user.firstName;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      } else {
        this.loggedInUser = null;
        this.userName = null;
      }
    });

    // Retrieve loggedInUser from localStorage when the page loads
    const loggedInUserString = localStorage.getItem('loggedInUser');

    if (loggedInUserString !== null) {
      this.loggedInUser = JSON.parse(loggedInUserString);
      this.userName = this.loggedInUser.firstName;
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('cartItems');
    localStorage.removeItem('loggedInUser');
    this.loggedInUser = null;
    this.userName = null;
  }

  showDropdown: boolean = false;

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.showDropdown = !this.showDropdown;
  }

  reloadPage(): void {
    this.router.navigateByUrl('/about').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }
}
