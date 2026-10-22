
export interface StudentActivityDto {
  id: number;
  studentId: number;
  teacherId: number;
  courseId: number;
  courseName: string;
  courseUnitCode: string;
  paymentSumma: number;
  paymentDate: string;
  paymentCount: number;
  activeNumber: number;
}
