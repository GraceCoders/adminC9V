import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStoreComponent } from './login-store.component';

describe('LoginStoreComponent', () => {
  let component: LoginStoreComponent;
  let fixture: ComponentFixture<LoginStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
