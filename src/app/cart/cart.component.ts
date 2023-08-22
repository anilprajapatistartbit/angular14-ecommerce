import { Component, Input } from '@angular/core';
import {FoodService} from '../food.service';
import { Food } from '../food/food';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Food[] = [];
 
  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();

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
    getFormattedGrandTotal(): string {
    const grandTotal = this.getGrandTotal();
    return grandTotal.toLocaleString('en-IN');
  }
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
   
  }
  food: any = {
    quantity: 1
  };
  
  decreaseQuantity(food: any) {
    if (food.quantity > 1) {
      food.quantity--;
    }
  }
  
increaseQuantity(food: any) {
  food.quantity++;
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


