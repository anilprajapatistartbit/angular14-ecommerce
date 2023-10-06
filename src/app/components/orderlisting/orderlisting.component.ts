import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ApiService } from 'src/app/services/api.service.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-orderlisting',
  templateUrl: './orderlisting.component.html',
  styleUrls: ['./orderlisting.component.css']
})
export class OrderlistingComponent {
  orders: any[] = [];
  selectedOrder: Order | null = null;

  p: number = 1;

  constructor(private apiService: ApiService,private foodService:FoodService,private router :Router) {}

  ngOnInit() {
    // Fetch orders and populate the orders array
    this.apiService.getOrder().subscribe(
      (response) => {
        console.log('API Response:', response); 
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  navigateToOrderDetails(orderId: number) {
  
    this.router.navigate(['/fooddetails', orderId]);
  }
  calculateTotal(order: any): number {
    if (!order || !order.orderItems) {
      return 0; // Return 0 if data is not available
    }

    return order.orderItems.reduce((total: number, orderItem: { price: number; quantity: number; }) => {
      return total + orderItem.price * orderItem.quantity;
    }, 0);
  }
}
