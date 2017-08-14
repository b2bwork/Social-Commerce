import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpollProductComponent } from './addpoll-product.component';

describe('AddpollProductComponent', () => {
  let component: AddpollProductComponent;
  let fixture: ComponentFixture<AddpollProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpollProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpollProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
