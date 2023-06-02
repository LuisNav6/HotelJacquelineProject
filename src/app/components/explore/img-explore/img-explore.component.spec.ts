import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgExploreComponent } from './img-explore.component';

describe('ImgExploreComponent', () => {
  let component: ImgExploreComponent;
  let fixture: ComponentFixture<ImgExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
