import { Injectable } from '@angular/core';
import { Food } from './food/food';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() { }
  private cartItems: Food[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
  addToCart(product: Food) {
  
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (!existingItem) {
    
      this.cartItems.push(product);
      alert("Product is successfully added in cart");
     this.cartItemCount.next(this.cartItems.length); 
    } else {
    
      alert('Product is already added to the cart');
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      alert("Deleted from the cart");
      this.cartItemCount.next(this.cartItems.length); 
    }
}
}
