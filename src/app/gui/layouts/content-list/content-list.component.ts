import {Component, Input, OnInit} from '@angular/core';
import {MenuContentComponent} from "../../contents/menu-content/menu-content.component";
import {NgForOf, NgIf} from "@angular/common";
import {TeacherInfoComponent} from "../../contents/teacher-info/teacher-info.component";
import {TestsComponent} from "../../contents/tests/tests.component";
import {YoutubeVideoComponent} from "../../contents/youtube-video/youtube-video.component";
import {ContentDto} from '../../../interfaces/ContentDto';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';
import {LevelsService} from '../../../services/levels.service';
import {UnitMenuDto} from '../../../interfaces/UnitMenuDto';
import {InnerHeaderComponent} from '../inner-header/inner-header.component';
import {TextWithSelectComponent} from '../../contents/text-with-select/text-with-select.component';
import {
  TextWithSelectFromListComponent
} from '../../contents/text-with-select-from-list/text-with-select-from-list.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    MenuContentComponent,
    NgForOf,
    NgIf,
    TeacherInfoComponent,
    TestsComponent,
    YoutubeVideoComponent,
    InnerHeaderComponent,
    TextWithSelectComponent,
    TextWithSelectFromListComponent
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent implements OnInit {
  @Input() lessonId: number = 0;
  @Input() adminMode: boolean = false;
  @Input() header: string = 'Lesson';
  activeMenuItemId: number = 0;
  contents: ContentDto[] = [];
  @Input() studentMode: boolean = false;
  menu: MenuItemDto[] = [];
  editingContentIndex: number = -1;
  // editingLineId: number = 0;
  // editingLineIndex: number = -1;
  // generalErrorText: string = "";
  editingMenuMode: boolean = false;

  //
  constructor(private stringUtil: StringUtilService,
              private apiService: ApiService) {}

  //
  ngOnInit() {
    console.log("content-list: ngOnInit(), this.activeMenuItemId=" + this.activeMenuItemId + ", this.adminMode=" + this.adminMode);
    this.initData();
  }

  initData() {
    let lessonMenuDto: UnitMenuDto = {unitId: this.lessonId, menuItemId: this.activeMenuItemId};
    //console.log('content-list: lessonMenuDto=' + JSON.stringify(lessonMenuDto));
    console.log('content-list: lessonMenuDto=' + lessonMenuDto);
    this.apiService.getUnitContents(this.adminMode, lessonMenuDto).subscribe({
      next: value => {
        console.log('content-list: next: value=...');
        //console.log('content-list: next: value='+JSON.stringify(value));
        this.menu = value.menuItems;
        this.contents = value.contents;
        this.activeMenuItemId = value.activeMenuId;
        this.header = 'Lesson: ' + value.lessonName;
      },
      error: error => {
        console.log('getAdminContent, error=' + JSON.stringify(error));
      }
    })
  }

  //
  updateContentAndList(content: ContentDto) {
    console.log('editLesson: updateContent, content=' + JSON.stringify(content));
    this.getContentByIdAndDefineIndex(content.id);
    this.apiService.adminContent('update', content).subscribe({
      next: value => {
        this.contents[this.editingContentIndex] = value;
      }, error: error => {
        console.log('adminUpdateLesson, error=' + JSON.stringify(error));
      }
    })
  }

  //
  addMenuItem() {
    console.log('addMenuItem()');
    let num = Math.max(...this.menu.map(item => item.order), 0);
    let menuItem = this.getEmptyMenuItem();
    menuItem.order = num + 1;
    this.apiService.adminMenuItemForUnit('create', menuItem).subscribe(
      {
        next: value => {
          menuItem = value;
          this.menu.push(menuItem);
        }
        , error: error => {
          console.log('adminCreateMenuItem, error=' + JSON.stringify(error));
        }
      }
    )
  }

  clickMenuItem(menuItemId: number) {
    if (this.editingMenuMode) {
      console.log('Skip clickMenuItem=' + menuItemId);
      return;
    }
    console.log('clickMenuItem=' + menuItemId);
    this.activeMenuItemId = menuItemId;
    this.initData();
    //this.router.navigate([url + this.lessonId + '/' + menuItemId]);
  }

  editMenuItem() {
    this.editingMenuMode = true;
  }

  saveMenuItem() {
    console.log('saveMenuItem()');
    this.editingMenuMode = false;
    for (let i = 0; i < this.menu.length; i++) {
      let id: number = this.menu[i].id;
      let orderEl = document.getElementById('lesson-menu-item-order-' + id) as HTMLInputElement;
      let nameEl = document.getElementById('lesson-menu-item-name-' + id) as HTMLInputElement;
      this.menu[i].name = nameEl.value;
      this.menu[i].order = this.stringUtil.convertStringToNumber(orderEl.value, this.menu[i].order);
    }
    console.log('saveMenuItem()_after for, this.menu=' + this.menu);
    this.apiService.adminUpdateItemForUnit(this.menu).subscribe({
      next: value => {
        this.menu = value;
      },
      error: error => {
        console.log('getAdminContent, error=' + JSON.stringify(error));
      }
    })

  }

  deleteMenuItem(id: number) {
    console.log('deleteMenuItem(), id=' + id);
    let menuItem = this.getEmptyMenuItem();
    menuItem.id = id;
    let index = 0;
    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].id == id) {
        index = i;
      }
    }
    this.apiService.adminMenuItemForUnit('delete', menuItem).subscribe(
      {
        next: value => {
          this.menu.splice(index, 1);
        }
        , error: error => {
          console.log('adminDeleteMenuItem, error=' + JSON.stringify(error));
        }
      }
    )
  }

  deleteContentFromList(id: number) {
    console.log('deleteContent(), id=' + id);
    let content= this.getContentByIdAndDefineIndex(id);
    if(!content) return;
    this.apiService.adminContent('delete',content).subscribe({
      next: value => {
        this.contents.splice(this.editingContentIndex, 1);
      },
      error: error => {
        console.log('deleteContent, error=' + JSON.stringify(error));
      }
    })
  }


  getContentByIdAndDefineIndex(id: number): ContentDto | undefined {
    this.editingContentIndex = -1;
    for (let i = 0; i < this.contents.length; i++) {
      let content = this.contents[i];
      if (content.id === id) {
        this.editingContentIndex = i;
        return content;
      }
    }
    return undefined;
  }

  createNewContent(typeName: string, notYet: boolean) {
    console.log('content-list: createNewContent');
    if (notYet) {
      alert('This block not implemented yet!');
      return;
    }
    let newContent = this.getEmptyContent();
    switch (typeName) {
      case "youtube_video": newContent.task = 'Watch the video.';break;
      case "teacher_info": newContent.task = 'This is a teacher info block.';break;
      case "text-with-select": newContent.text = 'Example of using this block: {case1; case2*; case3}. Where * uses for main value.';break;
      case "text-with-select-from-list": newContent.text = 'Example of using this block: {case1*}. Another {case2*}';break;
    }
    newContent.type = typeName;

    this.apiService.adminContent('create', newContent).subscribe(
      {
        next: value => {
          let content: ContentDto = value;
          if (!this.contents) {
            this.contents = [];
          }
          if (content) {
            this.contents.push(content);
          }
        },
        error: error => {
          console.log('createNewContent, error=' + JSON.stringify(error));
        }
      }
    )
  }

  getEmptyContent(): ContentDto {
    return {
      id: 0,
      text: '',
      task: '',
      type: '',
      menuItemId: this.activeMenuItemId,
      url: '',
      code: '',
      numValue: 0,
      order: 0,
      userAnswer: '',
      score: 0,
      sentences: []
    }
  }

  getEmptyMenuItem(): MenuItemDto {
    return {
      id: 0,
      name: 'new',
      order: 1,
      url: '',
      img: '',
      title: '',
      unitId: this.lessonId
    }
  }
}
