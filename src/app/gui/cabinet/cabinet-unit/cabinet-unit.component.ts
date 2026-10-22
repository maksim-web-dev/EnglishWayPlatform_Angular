import {Component, OnInit} from '@angular/core';
import {MenuContentComponent} from "../../contents/menu-content/menu-content.component";
import {NgForOf, NgIf} from "@angular/common";
import {TeacherInfoComponent} from "../../contents/teacher-info/teacher-info.component";
import {TestsComponent} from "../../contents/tests/tests.component";
import {YoutubeVideoComponent} from "../../contents/youtube-video/youtube-video.component";
import {ContentListComponent} from '../../layouts/content-list/content-list.component';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {ActivatedRoute} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';

@Component({
  selector: 'app-cabinet-unit',
  standalone: true,
  imports: [
    MenuContentComponent,
    NgForOf,
    NgIf,
    TeacherInfoComponent,
    TestsComponent,
    YoutubeVideoComponent,
    ContentListComponent,
    InnerHeaderComponent
  ],
  templateUrl: './cabinet-unit.component.html',
  styleUrl: './cabinet-unit.component.css'
})
export class CabinetUnitComponent implements OnInit {
  lessonId: number = 0;

//  @ViewChild(ContentListComponent) child!: ContentListComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private stringUtil: StringUtilService) {
  }

  ngOnInit() {
    console.log("cabinet-unit: ngOnInit");
    this.initParam()
  }

  initParam() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.lessonId = this.stringUtil.convertStringToNumber(params.get('id'), 0);
      this.updatePage();
    });
  }
  updatePage(){
    console.log("cabinet-unit: updatePage");
  }
}
