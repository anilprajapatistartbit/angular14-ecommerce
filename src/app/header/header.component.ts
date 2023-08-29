import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Food } from '../food/food';
import { CartService } from '../cart.service';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  title: string = "Grocery List";
  siteName: string = "Easy Grocery";
  cartItemCount: number = 0;
  loggedInUser: any | null = null; 
  constructor(private cartService: CartService, public foodService: FoodService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });

    this.updateLoggedInUser(); 
  }

updateLoggedInUser(): void {
  const userString = localStorage.getItem('loggedInUser');
  this.loggedInUser = userString ? JSON.parse(userString) : null;
}

  logout(): void {
    this.cartService.clearCart();

    localStorage.removeItem('loggedInUser');
    this.updateLoggedInUser();
    this.router.navigate(['/login']); 
    this.toastr.error("Logout Successfully" );
    
  }
}
