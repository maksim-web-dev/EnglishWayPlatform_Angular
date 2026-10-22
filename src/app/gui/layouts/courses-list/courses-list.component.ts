import {Component, Input, OnInit} from '@angular/core';
import {CourseDto} from '../../../interfaces/CourseDto';
import {ApiService} from '../../../services/api.service';
import {LevelsService} from '../../../services/levels.service';
import {Router} from '@angular/router';
import {ModalComponent} from '../../dialog/modal/modal.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    ModalComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  @Input() adminMode: boolean = false;
  @Input() filterVisible: boolean = true;
  courses: CourseDto[] = [];
  visibleCourses: CourseDto[] = [];
  // generalErrorText: string = "";
  levels: string[] = [];
  codeLevels: string[] = [];
  levelFilters: string[] = [];
  defaultCourseImg: string = "/images/default-course.png";
  newCourseDialogVisible: boolean = false;

  constructor(private apiService: ApiService,
              private levelsService: LevelsService,
              private router: Router) {
    this.initLevel();
  }
  ngOnInit() {
    this.initData();
  }

  initLevel() {
    if (this.adminMode || this.filterVisible) {
      this.levels = this.levelsService.getLevels();
      this.codeLevels = this.levelsService.getCodeLevels();
    }
  }

  initData() {

    if (this.adminMode) {
      this.apiService.adminCourse('get-courses', null).subscribe(
        {
          next: value => {
            this.courses = value;
            this.updatePage();
          },
          error: error => {
            console.log('getCourse. error: ' + JSON.stringify(error));
          }
        }
      );
    } else {
      this.apiService.studentCatalogs('get-courses', null).subscribe(
        {
          next: value => {
            this.courses = value;
            this.updatePage();
          },
          error: error => {
            console.log('getCourse. error: ' + JSON.stringify(error));
          }
        }
      );
    }
  }

  updateFilters() {
    this.levelFilters = [];
    for (let code of this.codeLevels) {
      let checkElement = document.getElementById('level-' + code) as HTMLInputElement;
      console.log('checkElement=' + checkElement);
      if (checkElement.checked) {
        this.levelFilters.push(code);
      }
    }
  }

  updatePage() {
    this.updateFilters();
    if (this.levelFilters.length == 0) {
      this.visibleCourses = this.courses;
    } else {
      this.visibleCourses = this.courses.filter(course => this.levelFilters.includes(course.codeLevel));
    }
  }

  create() {
    this.newCourseDialogVisible = true;
    // todo: 1 open dialog with nameOfCourse + level
    //this.apiService.adminCourse('create', undefined).subscribe()
  }

  createCourse() {
    let nameElement = document.getElementById('newCourseName') as HTMLInputElement;
    let levelElement = document.getElementById('newCourseLevel') as HTMLSelectElement;
    let name = nameElement.value;
    let level = levelElement.value;
    let course: CourseDto = {id: 0, name: name, level: level, codeLevel: '', img: '', complication: '', units:[]};
    console.log('createCourse, course=' + JSON.stringify(course));
    this.apiService.adminCourse('create', course).subscribe({
      next: value => {
        this.courses = value;
        this.updatePage();
        this.newCourseDialogVisible = false;
      },
      error: error => {
        console.log('createCourse, error: ' + JSON.stringify(error));
      }
    })
  }

  goToLessonPage(idNum: number) {
    let url = '/cabinet/units/';
    if (this.adminMode) {
      url = 'admin/edit-units/';
    }
    console.log('goToLessonPage: ' + url);
    this.router.navigate([url, idNum]);
  }

}
