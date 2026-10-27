import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LevelTestDto} from '../interfaces/LevelTestDto';
import {CourseDto} from '../interfaces/CourseDto';
import {UnitDto} from '../interfaces/UnitDto';
import {ContentDto} from '../interfaces/ContentDto';
import {UnitMenuDto} from '../interfaces/UnitMenuDto';
import {MenuItemDto} from '../interfaces/MenuItemDto';
import {ResultDto} from '../interfaces/ResultDto';
import {StudentActivityDto} from '../interfaces/StudentActivityDto';
import {SettingsDto} from '../interfaces/SettingsDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8089/api/';
  // auth registration
  private loginApiUrl = this.apiUrl + 'auth/login';
  private rememberPasswordApiUrl = this.apiUrl + 'auth/remember';
  private changePasswordApiUrl = this.apiUrl + 'auth/change-password';
  private activateApiUrl = this.apiUrl + 'auth/activate';
  private regApiUrl = this.apiUrl + 'auth/reg';
  private quickRegApiUrl = this.apiUrl + 'auth/quick-reg';
  private innerPageApiUrl = this.apiUrl + 'inner-page';
  // get-menu-by-unit
  private menuItemByUnitApiUrl = this.apiUrl + 'get-menu-by-unit';
  // LevelTest
  private levelTestApiUrl = this.apiUrl + 'auth/level-tests';
  private adminLevelTestApiUrl = this.apiUrl + 'admin/get-level-tests';
  private createLevelTestApiUrl = this.apiUrl + 'admin/create-level-test';
  private updateLevelTestApiUrl = this.apiUrl + 'admin/update-level-test';
  private changeOrderLevelTestApiUrl = this.apiUrl + 'admin/change-order-level-test';
  private deleteLevelTestApiUrl = this.apiUrl + 'admin/delete-level-test';
  // For students: Course
  private studentGetCoursesApiUrl = this.apiUrl + 'get-courses';
  private studentGetUnitApiUrl = this.apiUrl + 'get-units';
  private studentGetContentsUrl = this.apiUrl + 'get-contents';
  // For teacher
  private teacherGetStudentActivitiesUrl = this.apiUrl + 'teacher/get-student-activities';
  private teacherGetStudentUnitsUrl = this.apiUrl + 'teacher/get-student-units';
  // AdminCourse
  private adminGetCoursesApiUrl = this.apiUrl + 'admin/get-courses';
  private adminCreateCourseApiUrl = this.apiUrl + 'admin/create-course';
  private adminUpdateCourseApiUrl = this.apiUrl + 'admin/update-course';
  private adminDeleteCourseApiUrl = this.apiUrl + 'admin/delete-course';
  // AdminUnits
  private adminGetUnitsApiUrl = this.apiUrl + 'admin/get-units';
  private adminUpdateUnitsApiUrl = this.apiUrl + 'admin/update-units';
  // AdminStudents
  private adminGetStudentActivitiesApiUrl = this.apiUrl + 'admin/get-students-activity';
  private adminCreateStudentActivityApiUrl = this.apiUrl + 'admin/create-student-activity';
  // AdminHistory
  private adminGetHistoryApiUrl = this.apiUrl + 'admin/get-history';
  // AdminSettings
  private adminGetSettingsApiUrl = this.apiUrl + 'admin/get-settings';
  private adminUpdateSettingsApiUrl = this.apiUrl + 'admin/update-settings';

  // Edit Admin MenuItemDto for Unit
  private adminCreateUnitMenuItemUrl = this.apiUrl + 'admin/create-menu-item-for-unit';
  private adminUpdateUnitMenuItemUrl = this.apiUrl + 'admin/update-menu-items-for-unit';
  private adminDeleteUnitMenuItemUrl = this.apiUrl + 'admin/delete-menu-item';
  // Edit Content
  private adminGetContentApiUrl = this.apiUrl + 'admin/get-contents';
  private adminCreateContentApiUrl = this.apiUrl + 'admin/create-content';
  private adminUpdateContentApiUrl = this.apiUrl + 'admin/update-content';
  private adminDeleteContentApiUrl = this.apiUrl + 'admin/delete-content';
  // Result
  private cabinetSaveResultApiUrl = this.apiUrl + 'cabinet/save-results';

  constructor(private http: HttpClient) {
  }

  reg(credentials: { username: string; name: string; password: string; email: string }): Observable<any> {
    console.log('AuthService, credentials=' + JSON.stringify(credentials))
    return this.http.post(this.regApiUrl, credentials);
  }

  rememberPassword(credentials: { email: string }): Observable<any> {
    console.log('AuthService, credentials.email=' + credentials.email)
    return this.http.post(this.rememberPasswordApiUrl, credentials);
  }

  changePassword(credentials: { password: string; code: string }): Observable<any> {
    return this.http.post(this.changePasswordApiUrl, credentials);
  }

  quickReg(credentials: { username:string; name: string; password: string; email: string; code: string }): Observable<any> {
    console.log('Api.quickReg: credentials=' + JSON.stringify(credentials))
    return this.http.post(this.quickRegApiUrl, credentials);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginApiUrl, credentials);
  }

  active(code: string | null): Observable<any> {
    return this.http.get(this.activateApiUrl + "?code=" + code);
  }

  getLevelTest(): Observable<any> {
    return this.http.post(this.levelTestApiUrl, '');
  }
  adminUpdateItemForUnit(menuItemDtos: MenuItemDto[]): Observable<any> {
    return this.http.post(this.adminUpdateUnitMenuItemUrl, menuItemDtos);
  }
  adminHistory(): Observable<any>{
    return this.http.post(this.adminGetHistoryApiUrl, '');
  }
  adminSettings(operation: string, settings: SettingsDto|undefined): Observable<any>{
    let url = '';
    switch (operation) {
      case 'get': url = this.adminGetSettingsApiUrl; break;
      case 'update': url = this.adminUpdateSettingsApiUrl; break;
    }
    return this.http.post(url, settings);
  }
  teacherGetStudentActivities(): Observable<any>{
    return this.http.post(this.teacherGetStudentActivitiesUrl,'');
  }
  teacherGetStudentUnits(studentActivityId:number): Observable<any>{
    return this.http.post(this.teacherGetStudentUnitsUrl,{id:studentActivityId});
  }
  adminGetStudentActivity(): Observable<any>{
    return this.http.post(this.adminGetStudentActivitiesApiUrl,'');
  }
  adminCreateStudentActivity(studentActivityDto:StudentActivityDto|undefined): Observable<any>{
    return this.http.post(this.adminCreateStudentActivityApiUrl, studentActivityDto);
  }
  adminMenuItemForUnit(operation: string, menuItemDto: MenuItemDto): Observable<any> {
    let url = '';
    switch (operation) {
      case 'create': url = this.adminCreateUnitMenuItemUrl; break;
      case 'delete': url = this.adminDeleteUnitMenuItemUrl; break;
    }
    return this.http.post(url, menuItemDto);
  }
  innerPage(): Observable<any> {
    return this.http.post(this.innerPageApiUrl, '');
  }
  saveResult(result:ResultDto){
    return this.http.post(this.cabinetSaveResultApiUrl, result);
  }
  studentCatalogs(operation: string, course: CourseDto|null): Observable<any> {
    let url = '';
    switch (operation) {
      case 'get-courses': url = this.studentGetCoursesApiUrl; break;
      case 'get-units': url = this.studentGetUnitApiUrl; break;
    }
    console.log('ApiService.studentCatalogs('+operation+'), course=' + JSON.stringify(course));
    return this.http.post(url, course);
  }
  adminLevelTest(operation: string, test: LevelTestDto|undefined): Observable<any> {
    let url = '';
    switch (operation) {
      case 'get': url = this.adminLevelTestApiUrl; break;
      case 'create': url = this.createLevelTestApiUrl; break;
      case 'update': url = this.updateLevelTestApiUrl; break;
      case 'change-order': url = this.changeOrderLevelTestApiUrl; break;
      case 'delete': url = this.deleteLevelTestApiUrl; break;
    }
    console.log('ApiService.adminLevelTest('+operation+'), test=' + JSON.stringify(test));
    return this.http.post(url, test);
  }
  adminCourse(operation: string, course: CourseDto|null): Observable<any> {
    let url = '';
    switch (operation) {
      case 'get-courses': url = this.adminGetCoursesApiUrl; break;
      case 'create': url = this.adminCreateCourseApiUrl; break;
      case 'update': url = this.adminUpdateCourseApiUrl; break;
      case 'delete': url = this.adminDeleteCourseApiUrl; break;
    }
    console.log('ApiService.adminCourse('+operation+'), test=' + JSON.stringify(course));
    return this.http.post(url, course);
  }
  getUnitContents(isAdmin:boolean, unitMenuDto: UnitMenuDto): Observable<any>{
    if(isAdmin) {
      console.log('send '+this.adminGetContentApiUrl);
      return this.http.post(this.adminGetContentApiUrl, unitMenuDto);
    }
    console.log('send '+this.studentGetContentsUrl);
    return this.http.post(this.studentGetContentsUrl, unitMenuDto);
  }
  adminUnit(operation: string, course: CourseDto): Observable<any> {
    let url = '';
    switch (operation) {
      case 'get-units': url = this.adminGetUnitsApiUrl; break;
      case 'update-units': url = this.adminUpdateUnitsApiUrl; break;
    }
    return this.http.post(url, course);
  }
  // adminGetContent(menuItemId:number): Observable<any>{
  //   return this.http.post(this.adminContentApiUrl, {id: menuItemId});
  // }
  adminContent(operation: string, content: ContentDto): Observable<any> {
    let url = '';
    switch (operation) {
    //  case 'get': url = this.adminContentApiUrl; break;
      case 'create': url = this.adminCreateContentApiUrl; break;
      case 'update': url = this.adminUpdateContentApiUrl; break;
      case 'delete': url = this.adminDeleteContentApiUrl; break;
    }
    console.log('ApiService.adminContent('+operation+'), content=' + JSON.stringify(content)+', url='+url);
    return this.http.post(url, content);
  }
}
