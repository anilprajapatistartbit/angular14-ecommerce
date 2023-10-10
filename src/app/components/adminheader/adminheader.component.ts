import { Component } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ApiService } from 'src/app/services/api.service.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent {

constructor(private api: ApiService){}
ngOnInit(): void {
 
  
}
}







