import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-inner-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './inner-header.component.html',
  styleUrl: './inner-header.component.css'
})
export class InnerHeaderComponent {
  @Input() h2Text: string="";
  @Input() describeText: string="";
}
