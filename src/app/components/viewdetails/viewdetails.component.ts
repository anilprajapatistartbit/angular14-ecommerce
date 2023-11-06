import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../models/food';
import { CartService } from '../../services/cart.service';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements AfterViewInit {
  food: any;
  selectedImage: string = '';
  fruits: any[] = [];
  veggies: any[] = [];
  relatedProducts: Food[] = [];
  isLargeImage = true;
  showShortDescription = true;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const foodId = this.route.snapshot.paramMap.get('id');

    if (foodId !== null) {
      const Id = Number(foodId);

      if (!isNaN(Id)) {
        this.api.getFood(Id).subscribe(
          (food) => {
            this.food = food;
            this.selectedImage = food.images[1]?.url;

            // Fetch related products based on the food type
            if (food.type === 'Fruits') {
              this.api.getFruits().subscribe((data) => {
                this.relatedProducts = data;
              });
            } else if (food.type === 'Veggies') {
              this.api.getVeggies().subscribe((data) => {
                this.relatedProducts = data;
              });
            }
          },
          (error) => {
            console.error('Error fetching food detail', error);
          }
        );
      }
    }
  }
  toggleDescription() {
    this.showShortDescription = !this.showShortDescription;
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
 ngAfterViewInit(): void {
    const img = document.getElementById('gfg-img') as HTMLImageElement;
    console.log(img);
    const preview = document.querySelector('.zoom-preview') as HTMLElement;
  console.log(preview);
    if (img && preview) {
      const x = preview.offsetWidth / 100; 
      const y = preview.offsetHeight / 100;
  
      img.addEventListener('mousemove', (e) => {
        preview.style.backgroundImage = `url(${this.selectedImage})`;
        preview.style.backgroundSize = `${img.width * x}px ${img.height * y}px`;
        const posX = e.offsetX;
        const posY = e.offsetY;
        preview.style.backgroundPosition = `-${posX * x}px -${posY * y}px`;
      });
  
      img.addEventListener('mouseout', () => {
        preview.style.backgroundImage = 'none';
      });
    }
  }
  toggleImageSize() {
    this.isLargeImage = !this.isLargeImage;
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
