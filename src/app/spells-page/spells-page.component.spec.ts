import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsPageComponent } from './spells-page.component';

describe('SpellsPageComponent', () => {
  let component: SpellsPageComponent;
  let fixture: ComponentFixture<SpellsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
