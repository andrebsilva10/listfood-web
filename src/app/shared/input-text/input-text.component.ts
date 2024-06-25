import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() pattern?: string;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  errorMessage: string = '';
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
    if (!this.isValid) {
      this.errorMessage =
        'O valor inserido não corresponde ao padrão esperado.';
    } else {
      this.errorMessage = '';
    }
  }

  onBlur() {
    this.interacted = true;
    this.validate();
  }
}
