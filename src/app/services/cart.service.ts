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
  private Wishlist: Food[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);


  private userId: string=''; 
  constructor(private toastr: ToastrService,private authService: AuthService) {
    const loggedInUser = localStorage.getItem('loggedInUser');
  this.userId = loggedInUser ? JSON.parse(loggedInUser).userId : '';
    this.getCartItemsFromLocalStorage();
    this.getWishlistItemsFromLocalStorage();
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


  getCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem(`cartItems_${this.userId}`); // Include the user ID in the key
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemCount.next(this.cartItems.length);
    }
  }
  getWishlistItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem(`wishlist_${this.userId}`); // Include the user ID in the key
    if (storedCartItems) {
      this.Wishlist = JSON.parse(storedCartItems);
     
    }
  }
  addToCart(product: Food) {
   

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
   
   
    this.cartItems = [];
    this.cartItemCount.next(0);
  }

  getCartItems() {
    return this.cartItems;
  }

  getWishlistItems() {
    return this.Wishlist;
  }
  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.updateCartInLocalStorage();
      this.cartItemCount.next(this.cartItems.length);
      // alert("Deleted from the cart");
    }
  }
  removeFromWishlist(index: number) {
    if (index >= 0 && index < this.Wishlist.length) {
      this.Wishlist.splice(index, 1);
      this.updateWishlistInLocalStorage();
    

    }
  }

  setCartItems(cartItems: Food[]) {
    this.cartItems = cartItems;
    this.cartItemCount.next(cartItems.length);
  }


 updateCartInLocalStorage() {
    localStorage.setItem(`cartItems_${this.userId}`, JSON.stringify(this.cartItems));
  
  }
  addToWishlist(product: Food) {

    const existingItem = this.Wishlist.find((item) => item.id === product.id);
  
    if (!existingItem) {
      this.Wishlist.push(product);
      console.log('Item added to wishlist:', product);
      this.updateWishlistInLocalStorage(); // Make sure this function is called
     
      this.toastr.success('Product is successfully added to the wishlist.');
    } else {
      this.toastr.info('Product is already added to the wishlist.');
    }
  }
  
  updateWishlistInLocalStorage() {
    // Use Wishlist to store in localStorage
    localStorage.setItem(`wishlist_${this.userId}`, JSON.stringify(this.Wishlist));
  }
}
