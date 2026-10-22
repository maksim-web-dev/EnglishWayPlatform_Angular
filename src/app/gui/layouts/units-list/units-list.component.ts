import {Component, Input, OnInit} from '@angular/core';
import {CourseDto} from '../../../interfaces/CourseDto';
import {UnitDto} from '../../../interfaces/UnitDto';
import {ActivatedRoute, Router} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';
import {LevelsService} from '../../../services/levels.service';
import {EditingButtonsBlockComponent} from '../editing-buttons-block/editing-buttons-block.component';
import {InnerGeneralErrorBlockComponent} from '../inner-general-error-block/inner-general-error-block.component';
import {InnerHeaderComponent} from '../inner-header/inner-header.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-units-list',
  standalone: true,
  imports: [
    EditingButtonsBlockComponent,
    InnerGeneralErrorBlockComponent,
    InnerHeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './units-list.component.html',
  styleUrl: './units-list.component.css'
})
export class UnitsListComponent implements OnInit {
  @Input({required: true}) courseId: number = 0;
  @Input() adminMode: boolean = false;
  editingMode: boolean = false;

//  editingLineId: number = 0;
//  editingLineIndex: number = -1;
//  generalErrorText: string = "";
  course: CourseDto;
  levels: string[] = [];
  course_img: string = "/images/default-course.png";

  constructor(private stringUtil: StringUtilService,
              private apiService: ApiService,
              private router: Router,
              private levelsService: LevelsService) {
    this.course = this.getEmptyCourse();
    this.levels = levelsService.getLevels();
  }

  ngOnInit() {
    console.log('units-list.ngOnInit(), this.adminMode='+this.adminMode);
    this.initData();
  }

  initData() {
    this.course.id = this.courseId;
    console.log('units-list: initData(), this.adminMode=' + this.adminMode);
    if (this.adminMode) {
      this.apiService.adminUnit('get-units', this.course).subscribe(
        {
          next: value => {
            this.course = value;
          },
          error: error => {
            console.log('initData().adminLesson(get-units): error: ' + JSON.stringify(error));
          }
        }
      );
    } else {
      this.apiService.studentCatalogs('get-units', this.course).subscribe(
        {
          next: value => {
            this.course = value;
          },
          error: error => {
            console.log('initData().studentCatalogs(get-units): error: ' + JSON.stringify(error));
          }
        }
      );
    }
  }

  editCourse() {
    this.editingMode = true;
  }

  removeCourse() {
    console.log('removeCourse!!!');
    if (this.course.units && this.course.units.length > 0) {
      alert('Before deleted course need delete all lessons of this course are belong.');
    } else {
      alert('we can remove course')
    }
  }

  updateCourse() {
    this.apiService.adminCourse('update', this.course).subscribe({
      next: value => {
        this.course = value;
      },
      error: error => {
        console.log('saveCourse, error: ' + JSON.stringify(error));
      }
    })
  }

  saveCourse() {
    this.editingMode = false;
    let nameElement = document.getElementById('units-list-course-name') as HTMLInputElement;
    let complicationElement = document.getElementById('units-list-course-complication') as HTMLInputElement;
    let levelElement = document.getElementById('units-list-course-level') as HTMLSelectElement;
    this.course.name = nameElement.value;
    this.course.level = levelElement.value;
    this.course.complication = complicationElement.value;
    if (this.course.units) {
      for (let lesson of this.course.units) {
        let id = lesson.id;
        let nameLessonElement = document.getElementById('units-list-lesson-name-' + id) as HTMLInputElement;
        let numLessonElement = document.getElementById('units-list-lesson-num-' + id) as HTMLInputElement;
        lesson.num = this.stringUtil.convertStringToNumber(numLessonElement.value, lesson.num);
        lesson.name = nameLessonElement.value;
        //{id: 0, name: 'New', num: 0};
      }
    }
    console.log('updateCourse, this.course=' + JSON.stringify(this.course));
    this.updateCourse();
  }

  uploadCourseImg() {
    alert('we can upload img for course');
  }

  moveToEditLessonPage1(id: number) {
    let url = '/cabinet/unit/';
    if (this.adminMode) {
      url = '/admin/edit-unit/';
    }
    let menu_id = 0;
    this.router.navigate([url + id]);
  }

  createLesson(num: number) {
    let newLesson: UnitDto = {id: 0, name: "New", num: num + 1};
    this.course.units.push(newLesson);
    this.updateCourse();
  }

  makeCorrectNumbersOfLesson() {
    for (let i = 0; i < this.course.units.length; i++) {
      this.course.units[i].num = i + 1;
    }
    this.updateCourse();
  }

  removeLesson(id: number) {
    for (let i = 0; i < this.course.units.length; i++) {
      if (this.course.units[i].id === id) {
        this.course.units.splice(i, 1);
      }
    }
    this.updateCourse();
  }

  changeOrderLesson(id: number, delta: number) {
    for (let i = 0; i < this.course.units.length; i++) {
      let currentLesson = this.course.units[i];
      if (currentLesson.id === id) {
        if (i + delta < 0 || (i + delta > this.course.units.length)) {
          return;
        }
        let num = currentLesson.num;
        currentLesson.num = this.course.units[i + delta].num;
        this.course.units[i + delta].num = num;
      }
    }
    this.updateCourse();
  }

  //
  // sortByNum1() {
  //   console.log('sortByNum');
  //   // let lessons1 = this.lessons.sort((a, b) => a.num - b.num);
  //   // this.lessons = lessons1;
  // }

  upLesson(id: number) {
    this.changeOrderLesson(id, -1);
  }

  downLesson(id: number) {
    this.changeOrderLesson(id, 1);
  }

  getEmptyCourse(): CourseDto {
    return {id: this.courseId, name: '', img: '', level: '', codeLevel: '', complication: '', units: []};
  }
}
