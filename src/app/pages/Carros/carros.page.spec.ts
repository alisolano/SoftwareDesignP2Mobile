import { ComponentFixture, TestBed } from '@angular/core/testing';
import { carrosPage } from './carros.page';

describe('countryCapPage', () => {
  let component: carrosPage;
  let fixture: ComponentFixture<carrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(carrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
