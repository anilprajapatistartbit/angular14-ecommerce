import { Component } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  userCount: number=0;
  foodCount: number=0;
  ordersCount:number=0;
  foods: Food[] = [];
  constructor(private api: ApiService) {} // Inject your API service here

  ngOnInit() {
    this.api.getUsers().subscribe(
      (users) => {
     
        const filteredUsers = users.filter((user: { role: string; }) => user.role !== 'Admin');
        this.userCount = filteredUsers.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  
    this.api.getFoods().subscribe(
      (foods) => {
        this.foodCount = foods.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  
    this.api.getOrder().subscribe(
      (order) => {
        this.ordersCount = order.length;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    };
}
