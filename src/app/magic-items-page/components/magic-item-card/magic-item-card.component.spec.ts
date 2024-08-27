import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemCardComponent } from './magic-item-card.component';

describe('MagicItemCardComponent', () => {
  let component: MagicItemCardComponent;
  let fixture: ComponentFixture<MagicItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
