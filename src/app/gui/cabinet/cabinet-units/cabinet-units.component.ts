import {Component} from '@angular/core';
import {MenuContentComponent} from '../../contents/menu-content/menu-content.component';
import {NgForOf, NgIf} from '@angular/common';
import {TeacherInfoComponent} from '../../contents/teacher-info/teacher-info.component';
import {TestsComponent} from '../../contents/tests/tests.component';
import {YoutubeVideoComponent} from '../../contents/youtube-video/youtube-video.component';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {UnitsListComponent} from '../../layouts/units-list/units-list.component';
import {ActivatedRoute} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';

@Component({
  selector: 'app-cabinet-units',
  standalone: true,
  imports: [
    MenuContentComponent,
    NgForOf,
    NgIf,
    TeacherInfoComponent,
    TestsComponent,
    YoutubeVideoComponent,
    InnerHeaderComponent,
    UnitsListComponent
  ],
  templateUrl: './cabinet-units.component.html',
  styleUrl: './cabinet-units.component.css'
})
export class CabinetUnitsComponent {
  courseId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private stringUtil: StringUtilService) {
    this.initParam()
  }

  initParam() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = this.stringUtil.convertStringToNumber(params.get('id'), 0);
      console.log("Init course with ID:", this.courseId);
    });
  }

}
