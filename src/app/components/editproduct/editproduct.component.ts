import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { ApiService } from 'src/app/services/api.service.service';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent {
  food: Food = new Food();
  foodId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.foodId = +params['id'];
      this.apiService.getFood(this.foodId).subscribe(
        (result) => {
          this.food = result;
        },
        (error) => {
          console.error('Error fetching food item:', error);
        }
      );
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.food.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.food.images.splice(index, 1);
  }

  updateFood() {
    // Send the updated images to the API
    const imageUrls: string[] = this.food.images.map((image) => image.url);
    this.apiService.updateFoodImages(this.food.id, imageUrls).subscribe(
      (response) => {
        console.log('Images updated successfully:', response);
        // Now, update the rest of the food item
        this.apiService.updateFood(this.foodId, this.food).subscribe(
          (result) => {
            console.log('Food item updated successfully:', result);
            this.router.navigate(['/foodlist']);
            this.toastr.success('Product Updated Successfully');
          },
          (error) => {
            console.error('Error updating food item:', error);
          }
        );
      },
      (error) => {
        console.error('Error updating images:', error);
      }
    );
  }
}
