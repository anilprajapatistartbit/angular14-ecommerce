import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  id: string | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      this.id = param.get('session_id');
    });
    
    console.log(this.id);
   
    const userId = this.authService.getUserId();
    console.log(userId);
const cartItem=this.cartService.getCartItems();
console.log(cartItem);
    // Get cart items from localStorage
    const cartItemsJson = localStorage.getItem('cartItems');

    if (cartItemsJson) {
      const cartItems = JSON.parse(cartItemsJson);
      console.log(cartItems);
      
      // Prepare the order data
      const orders = [];

      for (const cartItem of cartItems) {
        const order = {
          userId: userId,
          totalPrice: cartItem.price * cartItem.quantity,
        };

        // Push the order object to the orders array
        orders.push(order);
      }

      console.log('Order Data:', orders);

      // Define the API endpoint URL where you want to send the order data
      const apiUrl = 'https://localhost:7005/api/stripe/success/' + this.id;

      // Make an HTTP POST request to your API to send the order data
      this.http.post(apiUrl, { sessionId: this.id, foods: cartItems, userId: userId }).subscribe(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
}
