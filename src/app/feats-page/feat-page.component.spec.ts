import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatsPageComponent } from './feats-page.component';

describe('FeatsPageComponent', () => {
  let component: FeatsPageComponent;
  let fixture: ComponentFixture<FeatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
