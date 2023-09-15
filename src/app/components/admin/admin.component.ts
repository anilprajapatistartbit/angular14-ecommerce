import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service.service'; // Import your API service
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public role!: string;
  public users: any = [];

  constructor(private api: ApiService,private authService:AuthService,private cartService:CartService) {} // Inject your API service here

  ngOnInit() {
   
    };
      isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  } 
  logout() {
    this.authService.signOut();
   
  }
  clearCart(){
    this.cartService.clearCart();
  }
  }

