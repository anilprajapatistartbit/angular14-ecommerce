import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {
  title: string = "Grocery List";
  siteName: string = "Easy Grocery";
  cartItemCount: number = 0;
  userName: string | null = null;
  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private authService: AuthService,private api : ApiService,private cartService: CartService, public foodService: FoodService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });


  }

updateLoggedInUser(): void {
  const userString = localStorage.getItem('loggedInUser');
  this.loggedInUser = userString ? JSON.parse(userString) : null;
}


 
  }


