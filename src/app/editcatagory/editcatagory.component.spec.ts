import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcatagoryComponent } from './editcatagory.component';

describe('EditcatagoryComponent', () => {
  let component: EditcatagoryComponent;
  let fixture: ComponentFixture<EditcatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
