import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent {
 
  food: any;
selectedImage: string = '';

  constructor(private route: ActivatedRoute, private foodService: FoodService,private cartService: CartService) {}

  ngOnInit(): void {
    const foodId = this.route.snapshot.paramMap.get('id');
    
    if (foodId !== null) {
      const Id = Number(foodId); 
  
      if (!isNaN(Id)) {
        this.foodService.getFood(Id).subscribe(
          food => {
            this.food = food;
            this.selectedImage = food.images[0]?.url;
          },
          error => {
            console.error('Error fetching food detail', error);
          }
        );
      } 
  }

  }
  onThumbnailClick(imageId: string) {
    // Find the image object with the matching imageId
    const selectedImage = this.food.images.find((image: any) => image.id === imageId);
  
    // Set the selectedImage
    if (selectedImage) {
      this.selectedImage = selectedImage.url;
    }
  }
  
  
  
  addToCart(product: Food) { 
    this.cartService.addToCart(product);
    product.isInCart = true;
  }
  decreaseQuantity(food: any) {
    if (food.quantity > 1) {
      food.quantity--;
      
    }
  }
  
  increaseQuantity(food: any) {
    food.quantity++;
  }
}