import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
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
