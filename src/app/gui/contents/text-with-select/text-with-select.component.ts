import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentTemplateComponent} from "../content-template/content-template.component";
import {ContentDto} from '../../../interfaces/ContentDto';
import {AutoResizeDirective} from '../../directives/AutoResizeTextareaDirective';
import {NgForOf, NgIf} from '@angular/common';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {SafeHtmlPipe} from '../../../pipes/SafeHtmlPipe';

@Component({
  selector: 'app-text-with-select',
  standalone: true,
  imports: [
    ContentTemplateComponent,
    AutoResizeDirective,
    NgIf,
    NgForOf,
    QuillEditorComponent,
    FormsModule,
    SafeHtmlPipe
  ],
  templateUrl: './text-with-select.component.html',
  styleUrl: './text-with-select.component.css'
})
export class TextWithSelectComponent implements OnInit {
  @Input({required: true}) content!: ContentDto;
  @Input() expand: boolean = false;
  @Input() adminMode: boolean = false;
  @Input() studentMode: boolean = false;
  @Input() editingMode: boolean = false;
  @Output() updateContentAndListRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentFromListRequest = new EventEmitter<Number>();

  contentText: string = '';
  editingText: string = '';

  ngOnInit() {
//    this.updateText();
  }

  updateText() {
    this.contentText = this.content.text;
    if (this.content.sentences && this.content.sentences.length == 0) {
      for (let sentence of this.content.sentences) {
        this.contentText += sentence.text;
      }
    }
    this.editingText = this.contentText.replaceAll('</p>', '\n').replaceAll('<p>', '\t');

    // if (this.content?.text?.length > 0) {
    //   this.contentText = this.content.text.split('}')
    //     .map(part=> {
    //       let arr = part.split("{");
    //       if(arr.length == 1){
    //         return arr[0];
    //       }
    //       let str = arr[0] + "<select style='margin: 0 10px; border-radius: 6px;  padding: 4px 8px;'>";
    //       str += "<option></option><option>";
    //       let arr1 = arr[1].replaceAll('&nbsp;','');
    //       str += arr1.replaceAll(';', "</option><option>");
    //       str += "</option></select>"
    //       return str;
    //     }).join('');
    // }
  }
  // onTextareaKeydown(event: KeyboardEvent): void {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //
  //     const textarea = event.target as HTMLTextAreaElement;
  //     const start = textarea.selectionStart;
  //     const end = textarea.selectionEnd;
  //
  //     // Вставляем символ табуляции в текущее место
  //     const value = this.editingText;
  //     this.editingText =
  //       value.substring(0, start) + '\t' + value.substring(end);
  //
  //     // Обновляем позицию курсора
  //     setTimeout(() => {
  //       textarea.selectionStart = textarea.selectionEnd = start + 1;
  //     });
  //   }
  // }

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
