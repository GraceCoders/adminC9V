import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFeedbackStoreComponent } from './rating-feedback-store.component';

describe('RatingFeedbackStoreComponent', () => {
  let component: RatingFeedbackStoreComponent;
  let fixture: ComponentFixture<RatingFeedbackStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingFeedbackStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFeedbackStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
