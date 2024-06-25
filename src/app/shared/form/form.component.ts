import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() title: string = '';
  @Output() submitEvent = new EventEmitter<void>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitEvent.emit();
  }
}
