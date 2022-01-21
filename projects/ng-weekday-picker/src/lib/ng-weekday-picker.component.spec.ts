import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWeekdayPickerComponent } from './ng-weekday-picker.component';

describe('NgWeekdayPickerComponent', () => {
  let component: NgWeekdayPickerComponent;
  let fixture: ComponentFixture<NgWeekdayPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgWeekdayPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWeekdayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
