import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  User:any;
constructor(private api:ApiService){}
ngOnInit(){
  this.api.getUsers().subscribe((res: any) => {
    this.User=res;
   console.log(this.User);
  });
    
}
}
