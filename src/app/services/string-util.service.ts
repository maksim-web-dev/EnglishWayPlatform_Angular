import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtilService {

  convertNumberArrayToString(arr: number[]): string {
    let value = arr.map(v => "" + v).join(",");
    return arr.map(v => "" + v).join(",");
  }
  readNumberArrayFromString(str: string): number[] {
    return str?.split(",").map(v => Number(v)) ?? []
  }
  convertStringToNumber(str: string|undefined|null, def: number){
    try{
      if(str === undefined || str ===null) return def;
      return parseInt(str);
    } catch (e){
      return def;
    }
  }

}
