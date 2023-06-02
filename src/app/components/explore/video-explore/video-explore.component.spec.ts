import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoExploreComponent } from './video-explore.component';

describe('VideoExploreComponent', () => {
  let component: VideoExploreComponent;
  let fixture: ComponentFixture<VideoExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
