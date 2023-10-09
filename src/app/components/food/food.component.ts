import { Component, OnInit } from '@angular/core';

import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foods: Food[] = [];  
isInCart: Boolean =false;
p: number = 1;
selectedType: string = 'All';
totalItems: number = 14;
itemsPerPage: number = 8;
email: string = '';

  constructor(private cartService: CartService,
    private apiService: ApiService,private authService:AuthService) {}
  loadFoods() {
    this.apiService.getFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
      console.log(foods);
      
    });
    
  }       
  ngOnInit()  {
  this.loadFoods();
 
    };
  

  addToCart(product: Food) { 
    this.cartService.addToCart(product);
    product.isInCart = true;
  }
  addToWishlist(product: Food) { 
    this.cartService.addToWishlist(product);
    console.log(this.cartService.addToWishlist);
  }
  
getallfood(){
 return this.foods.length;
}
getfruits(){
  return this.foods.filter(food=>food.type==='Fruits').length;
}
getveggies(){
  return this.foods.filter(food=>food.type==='Veggies').length;
}
foodCountRadioButton: string="All";

onFilterRadioButtonChanged(data: string){
this.foodCountRadioButton=data;
}
food: any = {
  quantity: 1
};

decreaseQuantity(food: any) {
  if (food.quantity > 1) {
    food.quantity--;
  }
}

increaseQuantity(food: any) {
  food.quantity++;
}
searchText: string = '';
onSearchTextEntered(searchValue: string){
  this.searchText = searchValue;
  //console.log(this.searchText);
}
filterType(type: string): void {
  this.selectedType = type;
  console.log('Selected Type:', this.selectedType);

  // Filter and log the filtered results
  const filteredResults = this.food.filter((food: { type: string; }) => food.type === this.selectedType);
  console.log('Filtered Results:', filteredResults);
}
 get pages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  previousPage() {
    if (this.p > 1) {
      this.p--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.p < totalPages) {
      this.p++;
    }
  }

  goToPage(page: number) {
    this.p = page;
  }
  subscribe() {
 
 
    if (this.email) {
      this.apiService.createNewsletter({ email: this.email }).subscribe(
        (response) => {
          console.log('Subscription success:', response);
         
          this.email = '';
        },
        (error) => {
          console.error('Subscription failed:', error);
          
        }
      );
    }
     else {
      
      console.error('Invalid email address:', this.email);
    }
  }
}
