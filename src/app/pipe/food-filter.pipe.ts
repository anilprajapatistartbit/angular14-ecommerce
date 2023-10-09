import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food';


@Pipe({
  name: 'foodTypeFilter'
})
export class FoodTypeFilterPipe implements PipeTransform {
  transform(food: Food[], type: string): Food[] {
    if (!type || type.toLowerCase() === 'all') {
      return food; // Return the entire list if no type is selected or 'All' is selected
    }

    return food.filter(food => food.type.toLowerCase() === type.toLowerCase());
  }
}
