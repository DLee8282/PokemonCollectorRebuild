import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedNavBarComponent } from './logged-nav-bar.component';

describe('LoggedNavBarComponent', () => {
  let component: LoggedNavBarComponent;
  let fixture: ComponentFixture<LoggedNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
