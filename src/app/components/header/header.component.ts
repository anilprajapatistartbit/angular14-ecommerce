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

  logout() {
    this.authService.signOut();
    this.userName = null;
  }
}
