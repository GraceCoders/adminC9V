import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorenavbarComponent } from './storenavbar.component';

describe('StorenavbarComponent', () => {
  let component: StorenavbarComponent;
  let fixture: ComponentFixture<StorenavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorenavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
