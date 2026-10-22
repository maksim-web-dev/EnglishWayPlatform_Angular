import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelTestMarkService {
  private answers: (string | null)[] = [];
  private currentNumber: number = 0;
  private finished: boolean = false;

  initStorage(total: number): void {
    this.answers = new Array(total).fill(null);
    this.currentNumber = 0;
    this.finished = false;
  }

  getCurrentNumber(): number {
    return this.currentNumber;
  }

  isFinish(): boolean {
    return this.finished;
  }

  getAnswer(index: number): string | null {
    return this.answers[index] ?? null;
  }

  updateAnswer(index: number, answer: string | null): void {
    this.answers[index] = answer;
  }

  updateCurrentNumber(n: number): boolean {
    if (n < 0 || n >= this.answers.length) return false;
    this.currentNumber = n;
    return true;
  }

  finish(): void {
    this.finished = true;
  }

  getAnswersForRegister(): (string | null)[] {
    return this.answers;
  }
}