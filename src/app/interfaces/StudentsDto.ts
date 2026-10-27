import {StudentActivityDto} from './StudentActivityDto';
import {CourseDto} from './CourseDto';

export interface StudentsDto {
  studentsList: StudentActivityDto[];
  coursesList: CourseDto[];
}