import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistingComponent } from './orderlisting.component';

describe('OrderlistingComponent', () => {
  let component: OrderlistingComponent;
  let fixture: ComponentFixture<OrderlistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderlistingComponent]
    });
    fixture = TestBed.createComponent(OrderlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
