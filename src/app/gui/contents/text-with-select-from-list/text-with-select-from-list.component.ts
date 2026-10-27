import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentDto} from '../../../interfaces/ContentDto';
import {ContentTemplateComponent} from '../content-template/content-template.component';
import {NgForOf, NgIf} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {SafeHtmlPipe} from '../../../pipes/SafeHtmlPipe';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-with-select-from-list',
  standalone: true,
  imports: [
    ContentTemplateComponent,
    NgIf,
    QuillEditorComponent,
    SafeHtmlPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './text-with-select-from-list.component.html',
  styleUrl: './text-with-select-from-list.component.css'
})
export class TextWithSelectFromListComponent implements OnInit {
  @Input({required: true}) content!: ContentDto;
  @Input() expand: boolean = false;
  @Input() adminMode: boolean = false;
  @Input() studentMode: boolean = false;
  @Input() editingMode: boolean = false;
  @Output() updateContentAndListRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentFromListRequest = new EventEmitter<Number>();


  ngOnInit() {
    console.log('tests-content.ngOnInit: adminMode=' + this.adminMode + ', studentMode=' + this.studentMode);
  }

  // editContent() {
  //   this.editingMode = true;
  // }

  clickCheck() {
    // let results:ResultDto[]=[];
    // for (let sentence of this.sentences) {
    //   let r1 = document.getElementById('tests-content-case1-radio-' + sentence.id) as HTMLInputElement;
    //   let r2 = document.getElementById('tests-content-case2-radio-' + sentence.id) as HTMLInputElement;
    //   let r3 = document.getElementById('tests-content-case3-radio-' + sentence.id) as HTMLInputElement;
    //   let correctCase = r1.checked ? 1 : r2.checked ? 2 : r3.checked ? 3 : 0;
    //   let result:ResultDto={sentenceId: sentence.id, numAnswer:correctCase};
    //   results.push(result);
    // }
    // console.log('tests: clickCheck, results='+JSON.stringify(results));
    // this.apiService.saveResult(results).subscribe({
    //   next: value => {
    //     console.log('saveResult.next: '+JSON.stringify(value));
    //     const res: ResultDto = value as ResultDto;
    //     alert('Your result of tests: '+res.numAnswer+'%');
    //   },
    //   error: error => {console.log('saveResult.error: '+error);}
    // })
  }

  clickReset() {
    // for (let sentence of this.sentences) {
    //   let r1 = document.getElementById('tests-content-case1-radio-' + sentence.id) as HTMLInputElement;
    //   let r2 = document.getElementById('tests-content-case2-radio-' + sentence.id) as HTMLInputElement;
    //   let r3 = document.getElementById('tests-content-case3-radio-' + sentence.id) as HTMLInputElement;
    //   r1.checked = false;
    //   r2.checked = false;
    //   r3.checked = false;
    // }
  }

  updateContent(content: ContentDto) {
    this.editingMode = false;
    this.updateContentAndListRequest.emit(this.content);
  }

  deleteContent() {
    this.deleteContentFromListRequest.emit(this.content.id);
  }
}
