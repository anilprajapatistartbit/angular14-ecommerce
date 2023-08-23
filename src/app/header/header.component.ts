import { Component } from '@angular/core';
import { Food } from '../food/food';
import { CartService } from '../cart.service';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
title:string="Grocery List"
siteName: string="Easy Grocery"

cartItemCount: number = 0;

constructor(private cartService: CartService,public foodService: FoodService, private router : Router) {}

ngOnInit() {
  this.cartService.getCartItemCount().subscribe(count => {
    this.cartItemCount = count;
  });
}

logout(): void {
  localStorage.removeItem('loggedInUser');

  this.router.navigate(['/login']);
}

}
