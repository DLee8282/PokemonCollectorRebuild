import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNavBarComponent } from './session-nav-bar.component';

describe('SessionNavBarComponent', () => {
  let component: SessionNavBarComponent;
  let fixture: ComponentFixture<SessionNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
