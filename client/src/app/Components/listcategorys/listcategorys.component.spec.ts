import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategorysComponent } from './listcategorys.component';

describe('ListcategorysComponent', () => {
  let component: ListcategorysComponent;
  let fixture: ComponentFixture<ListcategorysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcategorysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
