import { Routes } from '@angular/router';
import {LandingPageComponent} from './gui/pages/landing-page/landing-page.component';
import {ActivatePageComponent} from './gui/pages/activate-page/activate-page.component';
import {InnerPageTemplateComponent} from './gui/pages/inner-page-template/inner-page-template.component';
import {LoginPageComponent} from './gui/pages/login-page/login-page.component';
import {LandingRegistrationPageComponent} from './gui/pages/landing-registration-page/landing-registration-page.component';
import {ChangePasswordPageComponent} from './gui/pages/change-password-page/change-password-page.component';
import {LevelTestPageComponent} from './gui/pages/level-test-page/level-test-page.component';
import {AdminEditLevelTestComponent} from './gui/admin/edit-level-test/admin-edit-level-test.component';
import {AdminEditCoursesComponent} from './gui/admin/edit-courses/admin-edit-courses.component';
import {AdminDashboardComponent} from './gui/admin/admin-dashboard/admin-dashboard.component';
import {AdminEditCourseComponent} from './gui/admin/edit-course/admin-edit-course.component';
import {AdminEditUnitComponent} from './gui/admin/edit-unit/admin-edit-unit.component';
import {CabinetDashboardComponent} from './gui/cabinet/cabinet-dashboard/cabinet-dashboard.component';
import {CabinetCoursesComponent} from './gui/cabinet/cabinet-courses/cabinet-courses.component';
import {CabinetUnitsComponent} from './gui/cabinet/cabinet-units/cabinet-units.component';
import {CabinetUnitComponent} from './gui/cabinet/cabinet-unit/cabinet-unit.component';
import {AdminActivitiesComponent} from './gui/admin/admin-activities/admin-activities.component';
import {AdminHistoryComponent} from './gui/admin/admin-history/admin-history.component';
import {AdminSettingsComponent} from './gui/admin/admin-settings/admin-settings.component';
import {CabinetStudentsComponent} from './gui/cabinet/cabinet-students/cabinet-students.component';
import {CabinetStudentComponent} from './gui/cabinet/cabinet-student/cabinet-student.component';

export const routes: Routes = [
  /* -----  Main page ----- */
  {
    path: '',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  {
    path: 'main',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  {
    path: 'logout',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  /* -----  Authentication, registration and remember-password pages ----- */
  {
    path: 'registration',
    component: LandingRegistrationPageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'activate',
    component: ActivatePageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'change',
    component: ChangePasswordPageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'EnglishWayRegistration',
  },
  /* -----  Level-text page ----- */
  {
    path: 'level-test',
    component: LevelTestPageComponent,
    title: 'EnglishWayRegistration',
  },
  /* -----  Cabinet page ----- */
  {
    path: 'cabinet',// for teacher and student
    component: InnerPageTemplateComponent,
    children: [
      { path: 'dashboard', component: CabinetDashboardComponent },
      { path: 'courses', component: CabinetCoursesComponent },
      { path: 'students', component: CabinetStudentsComponent },//???
      { path: 'student/:id', component: CabinetStudentComponent },//???
      { path: 'units/:id', component: CabinetUnitsComponent },
      { path: 'unit/:id', component: CabinetUnitComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: 'admin',
    component: InnerPageTemplateComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'level-test', component: AdminEditLevelTestComponent },
      { path: 'activity', component: AdminActivitiesComponent },//???
      { path: 'teachers', component: AdminEditCoursesComponent },//???
      { path: 'edit-courses', component: AdminEditCoursesComponent },
      { path: 'edit-units/:id', component: AdminEditCourseComponent },
      { path: 'edit-unit/:id', component: AdminEditUnitComponent },
      { path: 'students', component: AdminActivitiesComponent },//???
      { path: 'history', component: AdminHistoryComponent },//???
      { path: 'settings', component: AdminSettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },

];
