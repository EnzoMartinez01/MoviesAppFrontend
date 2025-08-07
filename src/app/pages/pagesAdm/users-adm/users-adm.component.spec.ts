import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdmComponent } from './users-adm.component';

describe('UsersAdmComponent', () => {
  let component: UsersAdmComponent;
  let fixture: ComponentFixture<UsersAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
