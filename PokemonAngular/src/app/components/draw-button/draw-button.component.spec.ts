import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawButtonComponent } from './draw-button.component';

describe('DrawButtonComponent', () => {
  let component: DrawButtonComponent;
  let fixture: ComponentFixture<DrawButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
