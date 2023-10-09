import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ApiService } from 'src/app/services/api.service.service';


@Component({
  selector: 'app-orderlisting',
  templateUrl: './orderlisting.component.html',
  styleUrls: ['./orderlisting.component.css']
})
export class OrderlistingComponent {
  orders: any[] = [];
  selectedOrder: Order | null = null;

  p: number = 1;

  constructor(private apiService: ApiService,private router :Router) {}

  ngOnInit() {
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



}