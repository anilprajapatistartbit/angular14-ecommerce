import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist: Food[] = [];
  constructor(private cartService: CartService,private toastr: ToastrService) {
    this.wishlist = this.cartService.getWishlistItems();
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }
  removeFromWishlist(index: number) {
    this.cartService.removeFromWishlist(index);
    this.toastr.error("Remove from wishlist");
   
  }
  food: any = {
    quantity: 1
  };
  
  decreaseQuantity(food: any) {
    if (food.quantity > 1) {
      food.quantity--;
      this.updateWishlistItems();
    }
  }
  
increaseQuantity(food: any) {
  food.quantity++;
  this.updateWishlistItems();
}
private updateWishlistItems() {
  this.cartService.updateWishlistInLocalStorage();
}
}
