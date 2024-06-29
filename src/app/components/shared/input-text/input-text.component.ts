import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
})
export class InputTextComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() pattern?: string;
  @Input() value: string = '';
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

  ngOnInit() {
    this.validate();
  }

  onValueChange(value: any) {
    this.value = value;
    this.valueChange.emit(value);
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
