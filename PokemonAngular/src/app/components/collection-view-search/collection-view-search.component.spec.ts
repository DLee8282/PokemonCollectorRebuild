import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionViewSearchComponent } from './collection-view-search.component';

describe('CollectionViewSearchComponent', () => {
  let component: CollectionViewSearchComponent;
  let fixture: ComponentFixture<CollectionViewSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionViewSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
