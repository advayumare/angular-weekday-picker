import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgWeekdayPickerComponent } from './ng-weekday-picker.component';



@NgModule({
  declarations: [
    NgWeekdayPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgWeekdayPickerComponent
  ]
})
export class NgWeekdayPickerModule { }
