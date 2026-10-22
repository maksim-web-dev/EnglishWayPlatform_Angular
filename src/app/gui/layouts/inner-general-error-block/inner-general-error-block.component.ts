import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-inner-general-error-block',
  standalone: true,
  imports: [],
  templateUrl: './inner-general-error-block.component.html',
  styleUrl: './inner-general-error-block.component.css'
})
export class InnerGeneralErrorBlockComponent {
  @Input({required:true}) generalErrorText: string="";
}
