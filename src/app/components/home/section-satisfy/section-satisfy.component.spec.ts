import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSatisfyComponent } from './section-satisfy.component';

describe('SectionSatisfyComponent', () => {
  let component: SectionSatisfyComponent;
  let fixture: ComponentFixture<SectionSatisfyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSatisfyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSatisfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
