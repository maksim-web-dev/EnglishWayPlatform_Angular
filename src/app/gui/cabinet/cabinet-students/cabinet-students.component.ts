import {Component, OnInit} from '@angular/core';
import {StudentActivityDto} from '../../../interfaces/StudentActivityDto';
import {ActivatedRoute, Router} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';
import {LevelsService} from '../../../services/levels.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cabinet-students',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './cabinet-students.component.html',
  styleUrl: './cabinet-students.component.css'
})
export class CabinetStudentsComponent  implements OnInit{
  studentActivityList:StudentActivityDto[]=[];

  constructor(private apiService: ApiService,
              private levelsService: LevelsService,
              private router: Router) {
    this.initData();
  }

  ngOnInit() {
    console.log("cabinet-unit: ngOnInit");
    this.initData();
  }
  initData() {
    this.apiService.teacherGetStudentActivities().subscribe({
      next: value => {
        this.studentActivityList = value;
      },
      error: error => {
        console.log('createCourse, error: ' + JSON.stringify(error));
      }
    })

  }
}
