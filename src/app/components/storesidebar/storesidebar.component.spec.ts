import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresidebarComponent } from './storesidebar.component';

describe('StoresidebarComponent', () => {
  let component: StoresidebarComponent;
  let fixture: ComponentFixture<StoresidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
