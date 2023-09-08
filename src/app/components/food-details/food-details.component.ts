import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {
  selectedOrder: any;
  foodDetails: any;
  constructor(private route: ActivatedRoute,private foodService: FoodService) { }

 
  ngOnInit() {
    // Retrieve the selected order details from matrix parameters
    const matrixParams = this.route.snapshot.paramMap.get('selectedOrder');

    if (matrixParams) {
      this.selectedOrder = JSON.parse(matrixParams);

      if (this.selectedOrder.foodId) {
        this.foodService.getFood(this.selectedOrder.foodId)
          .subscribe((data) => {
            this.foodDetails = data;
          });
      }
    }
  }
}





