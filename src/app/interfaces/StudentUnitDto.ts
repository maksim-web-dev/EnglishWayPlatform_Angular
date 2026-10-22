export interface StudentUnitDto {
  id: number;
  num: number;
  unitName: string;
  hwScores: number[];
  classScores: number[];
  isNew: boolean;
  isPaymentAgree: boolean;
}
