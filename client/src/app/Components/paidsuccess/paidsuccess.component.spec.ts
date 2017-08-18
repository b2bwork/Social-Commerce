import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidsuccessComponent } from './paidsuccess.component';

describe('PaidsuccessComponent', () => {
  let component: PaidsuccessComponent;
  let fixture: ComponentFixture<PaidsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
