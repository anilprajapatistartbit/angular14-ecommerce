import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Food[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  // private cartLockKey = 'cartLock';
  private _stripeTransactionId: string = ''; 
  private userId: string=''; 
  constructor(private toastr: ToastrService,private authService: AuthService) {
    //this.userId = this.authService.getUserId(); // Get the user ID from your authentication service
    this.getCartItemsFromLocalStorage();

  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
  // validateCartBeforePayment(newCartItems: Food[]): boolean {
  //   const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as Food[];

  //   // Compare the current cart items with the stored cart items
  //   const cartItemsChanged = JSON.stringify(newCartItems) !== JSON.stringify(storedCartItems);

  //   if (cartItemsChanged) {
  //     this.toastr.error('Cart contents have changed. Please review your cart before payment.');
  //   }

  //   return !cartItemsChanged;
  // }

  getCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem(`cartItems_${this.userId}`); // Include the user ID in the key
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemCount.next(this.cartItems.length);
    }
  }

  addToCart(product: Food) {
    // Check if the cart is locked
    // if (this.isCartLocked()) {
    //   this.toastr.warning('Your cart is currently locked. Please try again later.');
    //   return;
    // }

    const existingItem = this.cartItems.find((item) => item.id === product.id);

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
    // Unlock the cart when clearing
   
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



  // Update cart data in local storage
  private updateCartInLocalStorage() {
    localStorage.setItem(`cartItems_${this.userId}`, JSON.stringify(this.cartItems));
     // Include the user ID in the key
  }
}
