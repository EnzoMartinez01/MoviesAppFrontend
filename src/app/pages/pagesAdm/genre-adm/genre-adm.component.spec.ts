import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAdmComponent } from './genre-adm.component';

describe('GenreAdmComponent', () => {
  let component: GenreAdmComponent;
  let fixture: ComponentFixture<GenreAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
