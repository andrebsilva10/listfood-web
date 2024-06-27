import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss',
})
export class ButtonPrimaryComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = '';
  @Input() class: string = 'btn btn-sm btn-primary rounded text-base-100';
  @Input() divClass: string = 'card justify-center mt-4';
}
