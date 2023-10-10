import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';
@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent {
 
  food: any;
selectedImage: string = '';
fruits: any[] = [];
veggies: any[] = [];
relatedProducts: Food[] = [];

  constructor(private route: ActivatedRoute,private cartService: CartService,private api:ApiService,private router: Router) {}

  ngOnInit(): void {
    const foodId = this.route.snapshot.paramMap.get('id');
  
    if (foodId !== null) {
      const Id = Number(foodId);
  
      if (!isNaN(Id)) {
        this.api.getFood(Id).subscribe(
          food => {
            this.food = food;
            this.selectedImage = food.images[1]?.url;
            
            // Fetch related products based on the food type
            if (food.type === 'Fruits') {
              this.api.getFruits().subscribe(data => {
                this.relatedProducts = data;
              });
            } else if (food.type === 'Veggies') {
              this.api.getVeggies().subscribe(data => {
                this.relatedProducts = data;
              });
            }
          },
          error => {
            console.error('Error fetching food detail', error);
          }
        );
      }
    }
  }
  reloadPage(): void {
    const foodId = this.route.snapshot.paramMap.get('id');
  
   
    this.router.navigateByUrl(`/viewdetail/${foodId}`).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
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
  addToWishlist(product: Food) { 
    this.cartService.addToWishlist(product);
 
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
