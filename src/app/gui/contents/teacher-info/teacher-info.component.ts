import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContentDto} from '../../../interfaces/ContentDto';
import {NgIf} from '@angular/common';
import {ContentTemplateComponent} from '../content-template/content-template.component';
import {AutoResizeDirective} from '../../directives/AutoResizeTextareaDirective';

@Component({
  selector: 'app-teacher-info',
  standalone: true,
  imports: [
    NgIf,
    ContentTemplateComponent,
    AutoResizeDirective
  ],
  templateUrl: './teacher-info.component.html',
  styleUrl: './teacher-info.component.css'
})
export class TeacherInfoComponent {
  @Input({required: true})  content!: ContentDto;
  @Input() expand: boolean = false;
  @Input() adminMode: boolean = false;
  @Input() editingMode: boolean = false;
  @Output() updateContentAndListRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentFromListRequest = new EventEmitter<Number>();


  updateContent(content: ContentDto) {
    this.editingMode = false;
    this.updateContentAndListRequest.emit(this.content);
  }

  deleteContent() {
    this.deleteContentFromListRequest.emit(this.content.id);
  }

}
