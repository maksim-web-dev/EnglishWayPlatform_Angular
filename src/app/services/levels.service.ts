import {Injectable} from '@angular/core';

export interface Level {
  code: string;
  name: string;
  levels: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  private levels: Level[] = [
    {code: 'A1', name: 'Beginner',     levels: ['A1']},
    {code: 'A2', name: 'Elementary',   levels: ['A1', 'A2']},
    {code: 'B1', name: 'Intermediate', levels: ['A1', 'A2', 'B1']},
    {code: 'B2', name: 'Upper-Intermediate', levels: ['A1', 'A2', 'B1', 'B2']},
    {code: 'C1', name: 'Advanced',     levels: ['A1', 'A2', 'B1', 'B2', 'C1']},
    {code: 'C2', name: 'Proficiency',  levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']},
  ];

  getLevels(): Level[] {
    return this.levels;
  }

  getLevelsWithLevels(): Level[] {
    return this.levels;
  }

  getLevelCode(code: string): number {
    return this.levels.findIndex(l => l.code === code);
  }
}