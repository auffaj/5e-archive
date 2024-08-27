import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatCardComponent } from './feat-card.component';

describe('FeatCardComponent', () => {
  let component: FeatCardComponent;
  let fixture: ComponentFixture<FeatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
