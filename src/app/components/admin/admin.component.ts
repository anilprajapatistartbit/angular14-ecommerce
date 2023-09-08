import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service.service'; // Import your API service

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
