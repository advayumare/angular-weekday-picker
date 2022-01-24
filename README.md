# NgWeekdayPicker

Angular component to let user select multiple weekdays from the list

### Screenshot
![Screenshhot](https://raw.githubusercontent.com/advayumare/ng-weekday-picker/master/assets/screenshot.png)

See [Demo](https://angular-e9ntox.stackblitz.io) 

## Getting Started
### Step 1: Install ng-weekday-picker
#### NPM

`npm install --save ng-weekday-picker`
  
### Step 2: Import the NgWeekdayPickerModule 
    import { NgWeekdayPickerModule } from 'ng-weekday-picker';
    @NgModule({
    declarations: [AppComponent],
      imports: [NgWeekdayPickerModule],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
### Step 3: Usage

    <ng-weekday-picker 
      [size]="'large'" 
      name="whiteDays" 
      formControlName="whiteDays"
      (changeDays)="$event">
    </ng-weekday-picker>

