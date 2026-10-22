import {ContentSentenceDto} from './ContentSentenceDto';

export interface ContentDto {
  id: number;
  text: string;
  task: string;
  type: string;
  menuItemId:number;
  url:string;
  code:string;
  order:number;
  numValue:number;
  userAnswer: string;
  score: number;
  sentences: ContentSentenceDto[] | undefined;
}
