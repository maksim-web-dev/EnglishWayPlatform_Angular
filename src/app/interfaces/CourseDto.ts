import {LessonDto} from './LessonDto';

export interface CourseDto {
  id: number;
  name: string;
  level: string;
  codeLevel: string;
  img: string;
  complication: string;
  lessons: LessonDto[];
}