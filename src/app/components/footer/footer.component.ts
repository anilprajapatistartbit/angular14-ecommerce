import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor( private router: Router) { }
  reloadPage(): void {
    this.router.navigateByUrl('/about').then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }
}
