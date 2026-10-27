import {StudentDto} from './StudentDto';
import {CourseDto} from './CourseDto';
import {UserDto} from './UserDto';

export interface ActivitiesListDto {
  studentsList: StudentDto[];
  teachersList: UserDto[];
  coursesList: CourseDto[];
}
