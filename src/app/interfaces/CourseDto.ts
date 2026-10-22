import {UnitDto} from './UnitDto';

export interface CourseDto {
  id: number;
  name: string;
  img: string;
  level: string;
  codeLevel: string;
  complication: string;
  units: UnitDto[];
}
