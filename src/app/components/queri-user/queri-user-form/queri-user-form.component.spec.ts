import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriUserFormComponent } from './queri-user-form.component';

describe('QueriUserFormComponent', () => {
  let component: QueriUserFormComponent;
  let fixture: ComponentFixture<QueriUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueriUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
