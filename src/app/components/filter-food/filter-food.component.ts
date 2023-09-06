import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-food',
  templateUrl: './filter-food.component.html',
  styleUrls: ['./filter-food.component.css']
})
export class FilterFoodComponent {
selectedradiobuttton: string='All';
@Input() all: number=0;
@Input() fruits: number=0;
@Input() veggies: number=0;


@Output()//custommevent
  filterRadioButtonSelectionChanged: EventEmitter<string> = new EventEmitter<string>();
//property
  onRadioButtonSelectionChanged(){
    this.filterRadioButtonSelectionChanged.emit(this.selectedradiobuttton);
    //console.log(this.selectedRadioButtonValue);

  }
}
