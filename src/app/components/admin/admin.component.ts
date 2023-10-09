import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service.service'; // Import your API service
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public role!: string;
  public users: any = [];

  constructor(private api: ApiService,private authService:AuthService,private cartService:CartService,private router:Router) {} // Inject your API service here

  ngOnInit() {
   
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

