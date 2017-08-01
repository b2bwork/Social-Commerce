import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewcontentComponent } from './reviewcontent.component';

describe('ReviewcontentComponent', () => {
  let component: ReviewcontentComponent;
  let fixture: ComponentFixture<ReviewcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
