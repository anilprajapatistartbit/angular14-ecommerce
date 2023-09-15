import { Component } from '@angular/core';
import { ApiService } from './services/api.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CUSTOMBINDING';
  public role!: string;
  public users: any = [];
  
  constructor(private api: ApiService,private router: Router) {} // Inject your API service here

  ngOnInit() {
    this.api.getUsers().subscribe((res: any) => {
      this.role = res.role; // Extract the user's role from the response
      this.users = res.users; // Assuming there is a 'users' property in the response
    });
    
}
shouldDisplayHeader(): boolean {
  const excludedRoutes = [ 'admin','userlist','foodlist','addproduct'];
  // Check if the current route is 'thankyou' (adjust the route path as needed)
  return !excludedRoutes.some(route => this.router.url.includes(route));
  
}

}
