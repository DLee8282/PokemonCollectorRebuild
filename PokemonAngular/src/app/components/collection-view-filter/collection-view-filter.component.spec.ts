import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionViewFilterComponent } from './collection-view-filter.component';

describe('CollectionViewFilterComponent', () => {
  let component: CollectionViewFilterComponent;
  let fixture: ComponentFixture<CollectionViewFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionViewFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
