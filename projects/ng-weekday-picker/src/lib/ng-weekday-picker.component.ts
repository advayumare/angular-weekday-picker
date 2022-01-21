import { Component, forwardRef, HostListener, Input, OnInit, Output, Renderer2, EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

class Item {
  item: any = null;
  next: any = null;
  prev: any = null;

  // constructor
  constructor(item: any) {
    this.item = item;
    this.next = new Item(this.item.nextSibling);
    this.prev = new Item(this.item.previousSibling);
  }

  // function
  hasClass(className:any): boolean {
    if (this.item && this.item.classList.contains(className)) {
      return true;
    } else {
      return false;
    }
  }
}
@Component({
  selector: 'ng-weekday-picker',
  templateUrl: './ng-weekday-picker.component.html',
  styleUrls: ['./ng-weekday-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgWeekdayPickerComponent),
    }
  ]
})
export class NgWeekdayPickerComponent implements OnInit, ControlValueAccessor {

  @Input() size: string = 'md';
  @Output() changeDays: EventEmitter<string[]> = new EventEmitter<string[]>();
  public whiteDays: Array<string> = [];
  public disabled = false;
  // public value: Array<string> = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  set value(val: string[]) {
    if (val !== this.whiteDays) {
      this.whiteDays = val;
      this.onChange(this.whiteDays);
      this.onTouched();
    }
  }

  get value() {
    return this.whiteDays;
  }

  writeValue(value: string[]) {
    if (value) {
      this.whiteDays = value;
    }
  }

  registerOnChange(fn:any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('valueChange', ['$event.detail'])
  listenForValueChange(value: any) {
    this.value = value;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  toggleClass(event: any, className: string, day: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.setAttribute(event.target, 'class', '');
      const index = this.whiteDays.indexOf(day);
      if (index > -1) {
        this.whiteDays.splice(index, 1);
      }
      this.changeDays.emit(this.whiteDays);
    } else {
      this.renderer.setAttribute(event.target, 'class', className);
      const index = this.whiteDays.indexOf(day);
      if (index === -1) {
        this.whiteDays.push(day);
      }
      this.changeDays.emit(this.whiteDays);
    }
  }

  updateClass(event: any, className: string) {
    const item = new Item(event.target);
    const hasClass = item.hasClass(className);
    if (hasClass) {
      // this.renderer.setAttribute(event.target, 'class', "");
      if (item.next.hasClass(className) && item.prev.hasClass(className)) {
        if (item.next.hasClass(className)) {
          this.renderer.setAttribute(item.next, 'class', className + ' center-side');
        } else {
          this.renderer.setAttribute(item.next, 'class', className + ' right-side');
        }
        if (item.prev.hasClass(className)) {
          this.renderer.setAttribute(item.prev, 'class', className + ' center-side');
        } else {
          this.renderer.setAttribute(item.prev, 'class', className + ' left-side');
        }
        this.renderer.setAttribute(item.item, 'class', className + ' center-side');
      } else if (item.next.hasClass(className) && !item.prev.hasClass(className)) {
        if (item.next.hasClass(className)) {
          this.renderer.setAttribute(item.next, 'class', className + ' center-side');
        } else {
          this.renderer.setAttribute(item.next, 'class', className + ' right-side');
        }
        this.renderer.setAttribute(item.item, 'class', className + ' left-side');
      } else if (!item.next.hasClass(className) && item.prev.hasClass(className)) {
        if (item.prev.hasClass(className)) {
          this.renderer.setAttribute(item.prev, 'class', className + ' center-side');
        } else {
          this.renderer.setAttribute(item.prev, 'class', className + ' left-side');
        }
        this.renderer.setAttribute(item.item, 'class', className + ' right-side');
      }
    } else {
      // this.renderer.setAttribute(event.target, 'class', className);
      if (item.next.hasClass("right-side")) {
        this.renderer.setAttribute(item.next, 'class', className);
      }
      if (item.next.hasClass('center-side')) {
        this.renderer.setAttribute(item.next, 'class', className + ' left-side');
      }
      if (item.prev.hasClass("left-side")) {
        this.renderer.setAttribute(item.prev, 'class', className);
      }
      if (item.prev.hasClass("center-side")) {
        this.renderer.setAttribute(item.prev, 'class', className + ' right-side');
      }
    }
  }

}
