import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpollproductComponent } from './listpollproduct.component';

describe('ListpollproductComponent', () => {
  let component: ListpollproductComponent;
  let fixture: ComponentFixture<ListpollproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpollproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpollproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
