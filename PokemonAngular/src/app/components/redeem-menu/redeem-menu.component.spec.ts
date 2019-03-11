import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemMenuComponent } from './redeem-menu.component';

describe('RedeemMenuComponent', () => {
  let component: RedeemMenuComponent;
  let fixture: ComponentFixture<RedeemMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
