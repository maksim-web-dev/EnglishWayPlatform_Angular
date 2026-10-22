import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilService {
  convertStringToNumber(value: string | null, defaultValue: number): number {
    if (value === null || value === '') return defaultValue;
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
}