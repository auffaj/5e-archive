import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipsPageComponent } from './equips-page.component';

describe('EquipsPageComponent', () => {
  let component: EquipsPageComponent;
  let fixture: ComponentFixture<EquipsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
