import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpostreviewComponent } from './listpostreview.component';

describe('ListpostreviewComponent', () => {
  let component: ListpostreviewComponent;
  let fixture: ComponentFixture<ListpostreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpostreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpostreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
