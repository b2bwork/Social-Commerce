import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductsComponent } from './listproducts.component';

describe('ListproductsComponent', () => {
  let component: ListproductsComponent;
  let fixture: ComponentFixture<ListproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
