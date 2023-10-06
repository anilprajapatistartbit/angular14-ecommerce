import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-fooddetailsbyuser',
  templateUrl: './fooddetailsbyuser.component.html',
  styleUrls: ['./fooddetailsbyuser.component.css']
})
export class FooddetailsbyuserComponent {
  orderId: number = 0;
  orderDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Retrieve the selected order details from matrix parameters
    this.route.params.subscribe((params) => {
      const orderId = +params['orderId'];
      console.log(orderId);

      // Call your getOrderDetails API with the orderId to fetch order details
      this.apiService.getOrderDetails(orderId).subscribe(
        (orderDetails) => {
          this.orderDetails = orderDetails;
          console.log('Order Details:', orderDetails);
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    });
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


