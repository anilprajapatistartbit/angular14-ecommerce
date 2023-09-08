import { Component } from '@angular/core';
import { ApiService } from './services/api.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CUSTOMBINDING';
  public role!: string;
  public users: any = [];

  constructor(private api: ApiService) {} // Inject your API service here

  ngOnInit() {
    this.api.getUsers().subscribe((res: any) => {
      this.role = res.role; // Extract the user's role from the response
      this.users = res.users; // Assuming there is a 'users' property in the response
    });
}
}
