import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickReferenceComponent } from './quick-reference.component';

describe('QuickReferenceComponent', () => {
  let component: QuickReferenceComponent;
  let fixture: ComponentFixture<QuickReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
