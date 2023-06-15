import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriUserComponent } from './queri-user.component';

describe('QueriUserComponent', () => {
  let component: QueriUserComponent;
  let fixture: ComponentFixture<QueriUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueriUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
