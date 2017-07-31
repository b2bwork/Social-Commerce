import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpostreviewComponent } from './userpostreview.component';

describe('UserpostreviewComponent', () => {
  let component: UserpostreviewComponent;
  let fixture: ComponentFixture<UserpostreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpostreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpostreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
