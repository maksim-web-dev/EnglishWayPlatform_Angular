import {Injectable} from '@angular/core';
import {StringUtilService} from './string-util.service';

@Injectable({
  providedIn: 'root'
})
export class LevelTestMarkService {
  answersStorageKey = "level-answers";
  currentNumberStorageKey = "level-current";
  isFinishStorageKey = "level-finish";
  codeForRegisterFormStorageKey = "answers-code";

  answers: number[] = [];
  currentNumber: number = 0;
  isFinishTestAlready: boolean = false;

  constructor(private stringUtil: StringUtilService) {
  }

  initStorage(count: number) {
    let strAnswers = sessionStorage.getItem(this.answersStorageKey) ?? "";
    this.answers = this.stringUtil.readNumberArrayFromString(strAnswers);
    let deltaCount = count - this.answers.length;
    for (let i = 0; i < deltaCount; i++) {
      this.answers.push(0);
    }

    let strCurrentNumber = sessionStorage.getItem(this.currentNumberStorageKey) ?? "";
    this.currentNumber = this.stringUtil.convertStringToNumber(strCurrentNumber, 0);
    if (!this.currentNumber || this.currentNumber < 1) {
      this.currentNumber = 1;
    }

    let strIsFinish = sessionStorage.getItem(this.isFinishStorageKey) ?? "";
    this.isFinishTestAlready = strIsFinish === 'true';

    console.log('initStorage(' + count + '): this.currentNumber=' + this.currentNumber +
      ', answers=' + this.answers +
      ', answers.length=' + this.answers.length +
      ', isFinishTestAlready=' + this.isFinishTestAlready);
  }

  updateAnswer(num: number, answer: number) {
    if (this.updateCurrentNumber(num)) {
      this.answers[this.currentNumber] = answer;
      this.updateLocalStorage();
    }
  }

  updateCurrentNumber(num: number): boolean {
    if (0 < num && num < this.answers.length) {
      this.currentNumber = num;
      return true;
    } else {
      console.error('level-test-mark.updateCurrentNumber: num ' + num + ' should be from 1 to ' + this.answers.length);
    }
    return false;
  }


  updateLocalStorage() {
    sessionStorage.setItem(this.currentNumberStorageKey, "" + this.currentNumber);
    sessionStorage.setItem(this.answersStorageKey, this.stringUtil.convertNumberArrayToString(this.answers));
    sessionStorage.setItem(this.isFinishStorageKey, "" + this.isFinish());
  }

  freeLevelTestInfo() {
    sessionStorage.setItem(this.currentNumberStorageKey, "");
    sessionStorage.setItem(this.answersStorageKey, "");
    sessionStorage.setItem(this.isFinishStorageKey, "");
    localStorage.setItem(this.answersStorageKey, "");
    console.log('level-test-mark.freeLevelTestInfo()');
  }

  finish() {
    sessionStorage.setItem(this.codeForRegisterFormStorageKey, this.stringUtil.convertNumberArrayToString(this.answers));
    this.freeLevelTestInfo();
    sessionStorage.setItem(this.isFinishStorageKey, "true");
  }

  getAnswersForRegister(): string {
    return sessionStorage.getItem(this.codeForRegisterFormStorageKey) ?? "";
  }
  // getAnswers(): number[] {
  //   return this.answers;
  // }
  getAnswer(num:number): number {
    return this.answers[num];
  }
  getCurrentNumber(): number {
    return this.currentNumber;
  }

  isFinish() {
    return this.isFinishTestAlready;
  }
}
