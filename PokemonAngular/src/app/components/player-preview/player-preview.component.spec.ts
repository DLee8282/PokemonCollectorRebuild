import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPreviewComponent } from './player-preview.component';

describe('PlayerPreviewComponent', () => {
  let component: PlayerPreviewComponent;
  let fixture: ComponentFixture<PlayerPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
