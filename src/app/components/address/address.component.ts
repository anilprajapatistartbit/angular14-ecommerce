import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  public addressData: any;
  selectedAddressIndex: number = -1; 
constructor(
  private http:HttpClient,
  private api:ApiService,
  private auth:AuthService
){
 
}
ngOnInit(){
  const userId=this.auth.getUserId();
  this.api.getAddress().subscribe(
    (data: any[]) => {
      // Store the retrieved address data in the addressData variable
      this.addressData = data;
      console.log(this.addressData);
    },
    (error) => {
      console.error('Error fetching address data:', error);
    }
  );
  if (userId !== null) {
this.api.getAddressByUser(userId).subscribe(
  (data:any[])=>{
    console.log("Address data by user ID:",data);
  },
  (error) => {
    console.error('Error fetching address data:', error);
  }
);
  }
  
}
onAddressSelect(index: number) {
  this.selectedAddressIndex = index;
  
 
}
}
