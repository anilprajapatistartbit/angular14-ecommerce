import { Component } from '@angular/core';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';
import { ToastrService } from 'ngx-toastr';
import { NgConfirmService } from 'ng-confirm-box';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent {
  foods: Food[] = [];

  constructor(
    private toastr: ToastrService,
    private foodService: FoodService,
    private confirmService: NgConfirmService,
   
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

  loadFoods() {
    this.foodService.getFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
    });
  }

  ngOnInit() {
    this.loadFoods();
  }

  deleteFood(id: number) {
    this.confirmService.showConfirm(
      'Are you sure you want to delete?',
      () => {
        // Confirmation callback - Delete the food item
        this.foodService.deleteFood(id).subscribe(
          () => {
            this.toastr.success('Food deleted successfully');
            this.loadFoods(); // Reload the list of foods after deletion
          },
          (error) => {
            this.toastr.error('An error occurred while deleting the food');
            console.error('Delete error:', error);
          }
        );
      },
      () => {
       
      }
    );
  }

}
