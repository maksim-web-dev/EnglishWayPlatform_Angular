import { Component } from '@angular/core';
import {CoursesListComponent} from '../../layouts/courses-list/courses-list.component';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';

@Component({
  selector: 'app-cabinet-courses',
  standalone: true,
  imports: [
    CoursesListComponent,
    InnerHeaderComponent
  ],
  templateUrl: './cabinet-courses.component.html',
  styleUrl: './cabinet-courses.component.css'
})
export class CabinetCoursesComponent {

}
