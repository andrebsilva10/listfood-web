import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaskDirective, FontAwesomeModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() pattern?: string;
  @Input() errorMessage: string = '';
  @Input() mask?: string = '';
  @Input() prefix: string = '';
  @Input() thousandSeparator: string = '';
  @Input() decimalMarker: any;
  @Input() dropSpecialCharacters: boolean = false;
  @Input() icon?: IconDefinition;
  @Input() svgContent?: string;
  @Input() showCurrencyPrefix: boolean = false;

  @Output() valueChange = new EventEmitter<any>();

  isValid: boolean = true;
  interacted: boolean = false;

  private _value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  @Input()
  set value(val: string) {
    this._value = val;
    this.onChange(this._value);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(value: string): void {
    this._value = value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
    this.validate();
  }

  validate() {
    const regex = new RegExp(this.pattern || '');
    this.isValid = regex.test(this.value);
  }

  onBlur() {
    this.interacted = true;
    this.validate();
  }
}
