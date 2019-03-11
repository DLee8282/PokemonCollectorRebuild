import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCollectionViewComponent } from './full-collection-view.component';

describe('FullCollectionViewComponent', () => {
  let component: FullCollectionViewComponent;
  let fixture: ComponentFixture<FullCollectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCollectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
