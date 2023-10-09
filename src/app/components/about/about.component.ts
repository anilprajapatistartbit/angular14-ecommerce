import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'src/assets/js/owl.carousel.min.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit() {
  //   var carousel = function() {
  //     (<any>$('.carousel-testimony')).owlCarousel({
  //       center: true,
  //       loop: true,
  //       items:1,
  //       margin: 30,
  //       stagePadding: 0,
  //       nav: false,
  //       navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
  //       responsive:{
  //         0:{
  //           items: 1
  //         },
  //         600:{
  //           items: 3
  //         },
  //         1000:{
  //           items: 3
  //         }
  //       }
  //     });
  //   };
  //   carousel();
  // }
}
}
