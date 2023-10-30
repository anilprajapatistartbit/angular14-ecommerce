import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food, Image } from 'src/app/models/food';
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
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
  }

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
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);

      if (file) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.food.images.push({ id: 0, url: e.target.result, foodId: this.foodId });
        };

        reader.readAsDataURL(file);
      }
    }
  }
  removeImage(index: number) {
    this.food.images.splice(index, 1);
  }

  updateFood() {
  
    const images: Image[] = this.food.images.map((image) => ({
      id: 0,
      url: image.url,
      foodId: this.foodId,
    }));

  
    this.food.images = images;

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
  }
}
