import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrls: ['./useraddress.component.css']
})
export class UseraddressComponent {
  

  selectedAddressIndex: number = -1;


  constructor(
    private http: HttpClient,
    private api: ApiService,

    private auth: AuthService,
    private cartService: CartService,
  ) {}
  @Input() addressData!: any[];
  @Output() addressSelected = new EventEmitter<any>();



 
  onAddressSelect(index: number) {
    this.selectedAddressIndex = index;
    this.addressSelected.emit(this.addressData[index]);

    this.api.setSelectedAddress(this.addressData[index]);
  }
  ngOnInit() {
    const userId = this.auth.getUserId();

    if (userId !== null) {
      this.api.getAddressByUser(userId).subscribe(
        (data: any[]) => {
          this.addressData = data;
          console.log("Address data by user ID:", data);
        },
        (error) => {
          console.error('Error fetching address data:', error);
        }
      );
    }
  }


 
 

 
}
