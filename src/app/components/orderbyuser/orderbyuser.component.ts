import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orderbyuser',
  templateUrl: './orderbyuser.component.html',
  styleUrls: ['./orderbyuser.component.css']
})
export class OrderbyuserComponent implements OnInit {
  userOrders: any[] = [];
  p: number = 1;
  constructor(private apiService: ApiService, private authService: AuthService,private router :Router) {}

  ngOnInit() {
    const userId = this.authService.getUserId();

    if (userId !== null) {
      this.apiService.getOrdersByUser(userId).subscribe(
        (data: any[]) => {
          this.userOrders = data;
          console.log("User Orders with Billing Details:", data);
        },
        (error) => {
          console.error('Error fetching user orders:', error);
        }
      );
    }
  }
  navigateToOrderDetails(orderId: number) {
  
    this.router.navigate(['/userfood', orderId]);
  }


}
