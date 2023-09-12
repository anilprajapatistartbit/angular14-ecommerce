import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-orderlisting',
  templateUrl: './orderlisting.component.html',
  styleUrls: ['./orderlisting.component.css']
})
export class OrderlistingComponent {
  orders: any[] = [];
  selectedOrder: any;
  p: number = 1;

  constructor(private apiService: ApiService,private foodService:FoodService,private router :Router) {}

  ngOnInit() {
    // Fetch orders and populate the orders array
    this.apiService.getOrders().subscribe(
      (response) => {
        console.log('API Response:', response); 
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  

 
  seeItem(selectedOrder: any) {
   
    this.router.navigate(['/fooddetails', { selectedOrder: JSON.stringify(selectedOrder) }]);
    
  }
}