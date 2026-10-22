import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentDto} from '../../../interfaces/ContentDto';
import {ContentSentenceDto} from '../../../interfaces/ContentSentenceDto';
import {AutoResizeDirective} from '../../directives/AutoResizeTextareaDirective';
import {ContentTemplateComponent} from '../content-template/content-template.component';
import {NgForOf, NgIf} from '@angular/common';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [
    AutoResizeDirective,
    ContentTemplateComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent implements OnInit {
  @Input({required: true}) content!: ContentDto;
  sentences: ContentSentenceDto[] = [];
  disabledUserElements = false;
  @Input() expand: boolean = false;
  @Input() adminMode: boolean = false;
  @Input() studentMode: boolean = false;
  @Input() editingMode: boolean = false;
  @Output() updateContentAndListRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentFromListRequest = new EventEmitter<Number>();

  constructor(private stringUtil: StringUtilService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    console.log('tests-content.ngOnInit: adminMode=' + this.adminMode + ', studentMode=' + this.studentMode);
    this.prepareSentence();
    this.disabledUserElements = false;
  }

  prepareSentence() {
    let userAnswer:string[] = this.content.userAnswer.split(',');
    this.sentences = [];
    if (this.content.sentences) {
      if(!this.adminMode) {
        this.disabledUserElements = userAnswer.length > 0;
      }
      let ind = 0;
      for(let sentence of this.content.sentences) {
        if(ind < userAnswer.length){
          sentence.answer = userAnswer[ind++];
        }
        this.sentences.push(sentence);
      }
    }
    console.log('updateSentence(), this.sentences=' + JSON.stringify(this.sentences));
  }


  addFewTests() {
    let textElement = document.getElementById('new-count-button-' + this.content.id) as HTMLTextAreaElement;
    let count = this.stringUtil.convertStringToNumber(textElement.value, 3);
    let currentOrder = this.sentences.length;
    for (let i = 0; i < count; i++) {
      this.sentences.push(this.getEmptySentence(++currentOrder));
    }
    this.content.sentences = this.sentences;
    this.updateContentAndListRequest.emit(this.content);
  }

  deleteSentence(id: number) {
    if (this.content.sentences && confirm('Are you sure to delete one of test item?')) {
      for (let i = 0; i < this.content.sentences.length; i++) {
        if (this.content.sentences[i].id === id) {
          this.content.sentences?.splice(i, 1);
          this.updateContentAndListRequest.emit(this.content);
          return;
        }
      }
    }
  }

  deleteContent() {
    if (confirm('Are you sure to delete one of test item?')) {

      this.deleteContentFromListRequest.emit(this.content.id);
    }
  }

  clickCheck() {
    let countOfSuccess = 0;
    let answerArr: number[] = [];
    for (let sentence of this.sentences) {
      let r1 = document.getElementById('case1-radio-' + sentence.id) as HTMLInputElement;
      let r2 = document.getElementById('case2-radio-' + sentence.id) as HTMLInputElement;
      let r3 = document.getElementById('case3-radio-' + sentence.id) as HTMLInputElement;
      let userCase = r1.checked ? 1 : r2.checked ? 2 : r3.checked ? 3 : 0;
      answerArr.push(userCase);
      if (userCase === sentence.correctCase) {
        countOfSuccess++;
      }
      console.log('userCase='+userCase+', sentence.correctCase='+sentence.correctCase+', countOfSuccess='+countOfSuccess);
    }
    let score = Math.round(100. * countOfSuccess / this.sentences.length);
    if (score === 0) {
      score = 1;
    }
    let answer = answerArr.join(',');
    this.disabledUserElements = true;
    this.sendResult(answer,score);
  }
  sendResult(answer:string, score: number){
    this.apiService.saveResult({contentId: this.content.id, answer: answer, score: score}).subscribe({
      next: () => {
        this.content.score = score;
        this.content.userAnswer = answer;
      },
      error: () => {
      }
    })
  }
  clickReset() {
    for (let sentence of this.sentences) {
      let r1 = document.getElementById('case1-radio-' + sentence.id) as HTMLInputElement;
      let r2 = document.getElementById('case2-radio-' + sentence.id) as HTMLInputElement;
      let r3 = document.getElementById('case3-radio-' + sentence.id) as HTMLInputElement;
      r1.checked = false;
      r2.checked = false;
      r3.checked = false;
    }
    this.sendResult('',0);
    this.disabledUserElements = false;
  }

  editContent() {
    this.editingMode = true;
  }

  updateContent(content: ContentDto) {
    console.log('updateContent');
    this.editingMode = false;
    this.saveSentences(content);
  }

  saveSentences(content: ContentDto) {
    for (let sentence of this.sentences) {
      let textElement = document.getElementById('question-textarea-' + sentence.id) as HTMLTextAreaElement;
      sentence.text = textElement.value;
      let orderElement = document.getElementById('order-of-sentence-' + sentence.id) as HTMLTextAreaElement;
      sentence.order = this.stringUtil.convertStringToNumber(orderElement.value, sentence.order);
      let case1Element = document.getElementById('case1-radio-' + sentence.id) as HTMLInputElement;
      let case2Element = document.getElementById('case2-radio-' + sentence.id) as HTMLInputElement;
      let case3Element = document.getElementById('case3-radio-' + sentence.id) as HTMLInputElement;
      let correctValue = 0;
      if (case1Element.checked) correctValue = 1;
      if (case2Element.checked) correctValue = 2;
      if (case3Element.checked) correctValue = 3;
      sentence.correctCase = correctValue;
      let case1TextElement = document.getElementById('case1-text-' + sentence.id) as HTMLInputElement;
      let case2TextElement = document.getElementById('case2-text-' + sentence.id) as HTMLInputElement;
      let case3TextElement = document.getElementById('case3-text-' + sentence.id) as HTMLInputElement;
      sentence.case1 = case1TextElement.value;
      sentence.case2 = case2TextElement.value;
      sentence.case3 = case3TextElement.value;
    }
    content.sentences = this.sentences;
    let numElement = document.getElementById('new-count-button-' + content.id) as HTMLInputElement;
    content.numValue = this.stringUtil.convertStringToNumber(numElement.value, 0);
    this.updateContentAndListRequest.emit(content);
    console.log('saveSentences');
  }

  getEmptySentence(order: number): ContentSentenceDto {
    return {
      id: 0,
      contentId: this.content.id,
      num: 0,
      order: order,
      text: '',
      case1: '',
      case2: '',
      case3: '',
      correctCase: 0,
      answer: ''
    }
  }
}
