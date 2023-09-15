import { Component, OnInit } from '@angular/core';
import {FoodService} from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  foods: Food[] = [];  
isInCart: Boolean =false;
p: number = 1;
  constructor(private foodService: FoodService, private cartService: CartService,private authService:AuthService) {}
  loadFoods() {
    this.foodService.getFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
      console.log(foods);
      
    });
  }
  ngOnInit()  {
  this.loadFoods();
 
    };
  
// food is a class
  addToCart(product: Food) { 
    this.cartService.addToCart(product);
    product.isInCart = true;
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

}

