import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemsPageComponent } from './magic-items-page.component';

describe('MagicItemsPageComponent', () => {
  let component: MagicItemsPageComponent;
  let fixture: ComponentFixture<MagicItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicItemsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
