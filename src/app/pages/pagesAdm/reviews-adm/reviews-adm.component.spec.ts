import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAdmComponent } from './reviews-adm.component';

describe('ReviewsAdmComponent', () => {
  let component: ReviewsAdmComponent;
  let fixture: ComponentFixture<ReviewsAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
