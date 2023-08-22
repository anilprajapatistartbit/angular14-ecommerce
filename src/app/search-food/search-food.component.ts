import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.css']
})
export class SearchFoodComponent {
  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
    
  
  }
  focusInput(inputElement: HTMLInputElement) {
    inputElement.focus();
}
}
