import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonShopItemComponent } from './pokemon-shop-item.component';

describe('PokemonShopItemComponent', () => {
  let component: PokemonShopItemComponent;
  let fixture: ComponentFixture<PokemonShopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonShopItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
