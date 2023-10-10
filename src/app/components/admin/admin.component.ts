import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service.service'; // Import your API service
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Route, Router } from '@angular/router';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public role!: string;
  public users: any = [];
  userCount: number=0;
  foodCount: number=0;
  ordersCount:number=0;
  foods: Food[] = [];
  constructor(private api: ApiService,private authService:AuthService,private cartService:CartService,private router:Router) {} // Inject your API service here

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
      isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  } 
  logout() {
  
    localStorage.removeItem('loggedInUser');
  
    this.authService.signOut();
   
  }
  clearCart(){
    this.cartService.clearCart();
  }
  }

