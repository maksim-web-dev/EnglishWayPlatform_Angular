import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  levels: string[] = [];
  codeLevels: string[] = [];
  objLevels: any[] = [];

  initLevels() {
    this.levels.push("Starter(A0)", "Beginner(A1)", "Pre-Intermediate(A2)", "Intermediate(B1)",
      "Upper-Intermediate(B2)", "Advanced(C1)");
    this.codeLevels.push("A0", "A1", "A2", "B1", "B2", "C1");
    for (let code of this.codeLevels) {
      let obj = {code: code, name: this.getLevelCode(code)};
      this.objLevels.push(obj);
    }
  }

  getLevelCode(levelCode: string | undefined): number {
    switch (levelCode?.toLowerCase()) {
      case 'a0':
        return 1;
      case 'a1':
        return 2;
      case 'a2':
        return 3;
      case 'b1':
        return 4;
      case 'b2':
        return 5;
      case 'c1':
        return 6;
      case 'c2':
        return 7;
    }
    return 0;
  }

  constructor() {
    this.initLevels();
  }

  getLevels(): string[] {
    return this.levels;
  }

  getCodeLevels(): string[] {
    return this.codeLevels;
  }

  getLevelsWithLevels(): any[] {
    return this.objLevels;
  }
}
