import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooddetailsbyuserComponent } from './fooddetailsbyuser.component';

describe('FooddetailsbyuserComponent', () => {
  let component: FooddetailsbyuserComponent;
  let fixture: ComponentFixture<FooddetailsbyuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooddetailsbyuserComponent]
    });
    fixture = TestBed.createComponent(FooddetailsbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
