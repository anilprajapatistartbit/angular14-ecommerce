import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';
@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent {
  addForm!: FormGroup;
  urls: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService // Inject your FoodService here
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      desc: ['']
    });
  }

  onSelect(event: any) {
    if (event.target.files) {
      this.urls = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.urls.push(e.target.result as string);
          }
        };
      }
    }
  }

  addFood() {
    if (this.addForm.valid) {
      const foodData = this.addForm.value;
      const foodWithImages: Food = {
        id: 0,
        name: foodData.name, 
        type: foodData.type,
        price: foodData.price,
        quantity: foodData.quantity,
        description: foodData.desc,
        images: this.urls.map(url => ({ id: 0, url, foodId: 0 })),
        isInCart: false
      };
  
      this.foodService.createFood(foodWithImages).subscribe(
        (response) => {
          console.log('Food added successfully:', response);
       
          this.addForm.reset();
          this.urls = [];
        },
        (error) => {
          console.error('Error adding food:', error);
  
        }
      );
    } else {
    
    }
  }
  
}
