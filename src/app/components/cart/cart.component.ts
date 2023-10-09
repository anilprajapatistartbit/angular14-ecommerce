import { Component, Input } from '@angular/core';

import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Food[] = [];
 
  constructor(private cartService: CartService,private toastr: ToastrService) {
    this.cartItems = this.cartService.getCartItems();
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }


 cartImg="./assets/emptycart.png"
 
 shopnow="./assets/shopnow.jpg"
  getGrandTotal() {
    let sum = 0;
    for (const item of this.cartItems) {
      sum += item.quantity * item.price;
    }
    return sum;
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.toastr.error("Remove from cart");
   
  }
  food: any = {
    quantity: 1
  };
  
  decreaseQuantity(food: any) {
    if (food.quantity > 1) {
      food.quantity--;
      this.updateCartItems();
    }
  }
  
increaseQuantity(food: any) {
  food.quantity++;
  this.updateCartItems();
}
 private updateCartItems() {
    this.cartService.updateCartInLocalStorage();
  }
getShippingCharge(): number | string {
  const total = this.getTotalPrice();

  if (total < 500 && total >200) {
    return (total * 0.02).toFixed(2);
  } else if (total >= 500) {
    return (total * 0.05).toFixed(2);
  } else {
    return 0;
  }
}

getTotalPrice(): number {
  return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}
getvaluewithshipping(): string {
  const shippingCharge = Number(this.getShippingCharge());
  const grandTotal = Number(this.getGrandTotal());

  if (shippingCharge !== 0) {
    const totalValue = shippingCharge + grandTotal;
    return totalValue.toFixed(2);
  } else {
    return this.getGrandTotal().toFixed(2);
  }
}

}


