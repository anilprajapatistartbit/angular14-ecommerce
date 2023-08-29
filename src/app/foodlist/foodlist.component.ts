import { Component } from '@angular/core';
import { Food } from '../food/food';
import { FoodService } from '../food.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent {
  foods: Food[] = [];  
  constructor(private toastr: ToastrService,private foodService: FoodService) {}
  loadFoods() {
    this.foodService.getFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
      console.log(foods);
      
    });
  }
  ngOnInit()  {
  this.loadFoods();
    };
    deleteFood(id: number) {
      this.foodService.deleteFood(id).subscribe(
        () => {
          this.toastr.success('Food deleted successfully');
          this.loadFoods(); // Refresh the list after deletion
        },
        (error) => {
          this.toastr.error('An error occurred while deleting the food');
          console.error('Delete error:', error);
        }
      );
}
}
