import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { BehaviorSubject } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Food[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private toastr: ToastrService) {
    
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemCount.next(this.cartItems.length);
    }
  }
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  calculateQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }  
  getCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemCount.next(this.cartItems.length);
    }
  }
  addToCart(product: Food) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (!existingItem) {
      this.cartItems.push(product);
      this.updateCartInLocalStorage();
      this.cartItemCount.next(this.cartItems.length);
       this.toastr.success('Product is successfully added to the cart.');
    } else {
       this.toastr.info('Product is already added to the cart.');
    }
  }
  clearCart() {
    this.cartItems = [];
    this.cartItemCount.next(0);
  }
  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.updateCartInLocalStorage();
      this.cartItemCount.next(this.cartItems.length);
      // alert("Deleted from the cart");
    }
  }

  private updateCartInLocalStorage() {
   
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
