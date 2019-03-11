import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemButtonComponent } from './redeem-button.component';

describe('RedeemButtonComponent', () => {
  let component: RedeemButtonComponent;
  let fixture: ComponentFixture<RedeemButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
