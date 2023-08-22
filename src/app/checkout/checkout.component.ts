import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
onSubmit(form:NgForm){
  console.log(form);

}
defaultCountry:string='india';
defaultgender:string='Male';

gender=[
  {id:'1',value:'Male'},
  {id:'2',value:'Female'},
  {id:'3',value:'Other'}


]
}
