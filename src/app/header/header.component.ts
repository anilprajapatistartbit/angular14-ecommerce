import { Component } from '@angular/core';
import { Food } from '../food/food';
import { CartService } from '../cart.service';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
title:string="Grocery List"
siteName: string="Easy Grocery"
loggedInUser: string | null = null;
cartItemCount: number = 0;

constructor(private cartService: CartService,private foodService: FoodService) {}

ngOnInit() {
  this.cartService.getCartItemCount().subscribe(count => {
    this.cartItemCount = count;
  });
}


}
