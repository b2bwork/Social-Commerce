import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfinanceComponent } from './userfinance.component';

describe('UserfinanceComponent', () => {
  let component: UserfinanceComponent;
  let fixture: ComponentFixture<UserfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
