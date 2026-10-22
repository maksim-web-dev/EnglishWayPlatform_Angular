import {UserDto} from './UserDto';
import {StudentActivityDto} from './StudentActivityDto';

export interface StudentDto {
  user: UserDto;
  actualLevelCode: string;
  studentActivities: StudentActivityDto[];
}
