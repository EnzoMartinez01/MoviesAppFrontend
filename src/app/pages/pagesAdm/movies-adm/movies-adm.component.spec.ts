import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesAdmComponent } from './movies-adm.component';

describe('MoviesAdmComponent', () => {
  let component: MoviesAdmComponent;
  let fixture: ComponentFixture<MoviesAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
