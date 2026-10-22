import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ContentDto} from '../../../interfaces/ContentDto';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';
import {SafeHtmlPipe} from '../../../pipes/SafeHtmlPipe';
import {AutoResizeDirective} from '../../directives/AutoResizeTextareaDirective';
import {FormsModule} from '@angular/forms';
import {ContentSelect} from '../../../interfaces/ContentSelect';
import {ResultDto} from '../../../interfaces/ResultDto';

@Component({
  selector: 'app-content-template',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SafeHtmlPipe,
    AutoResizeDirective,
    FormsModule
  ],
  templateUrl: './content-template.component.html',
  styleUrl: './content-template.component.css'
})
export class ContentTemplateComponent implements OnInit {
  @Input({required: true}) content!: ContentDto;
  @Input() expand: boolean = false;
  @Input() adminMode: boolean = false;
  @Input() useTextAndTextarea: boolean = true;
  @Input() hiddenTaskName: boolean = false;
  @Input() classContentName: string = '';
  @Input() useListOfCases: boolean = false;
  @Input() useCheckButton: boolean = false;
  @Input() useCheckRequest: boolean = false;

  useSelectOptions: boolean = false;
  selectsList: ContentSelect[] = [];
  listOfCases: string[] = [];
  //defaultLineOfOptions: string = '';
  selectIdPrefix = '';
  disabledCheckButton = false;

  editingMode: boolean = false;
  editingText: string = '';
  contentText: string = '';
  @Output() updateContentRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentRequest = new EventEmitter<Number>();
  @Output() editingModeRequest = new EventEmitter<Number>();
  @Output() checkRequest = new EventEmitter<Number>();
  @Output() resetRequest = new EventEmitter<Number>();

  constructor(private stringUtil: StringUtilService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    console.log('-------------------------------------------- content.type=' + this.content.type);
    this.selectIdPrefix = 'select_' + this.content.id + '_';
    this.prepareText();
    this.defineUseSelectOptions();
    this.defineListOfCases();
    if (this.content.score > 0 && this.useCheckButton) {
      this.disabledCheckButton = true;
    }
    this.convertEditingTextToContent();
  }

  prepareText() {
    this.editingText = this.content.text;
    if (this.useTextAndTextarea) {
      if (this.content.sentences) {
        for (let sentence of this.content.sentences) {
          this.editingText += sentence.text;
        }
      }
      this.contentText = this.editingText.replaceAll('\n', '<br>');
    }
  }

  defineUseSelectOptions() {
    if (this.editingText.includes('}')) {
      this.useSelectOptions = true;
    } else if (this.useTextAndTextarea) {
      this.useCheckButton = false;
    }
  }

  defineListOfCases() {
    if (this.useListOfCases) {
      this.editingText.split('}')
        .map(sentence => {
          let arr = sentence.split('{');
          if (arr.length == 2) {
            for (let option of arr[1].split(';')) {
              if (option.includes('*')) {
                option = option.replace('*', '').trim();
                this.listOfCases.push(option);
              }
            }
          }
        })
      this.listOfCases.sort();
    }
  }

  changeExpandValue() {
    this.expand = !this.expand;
  }

  handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target.id.indexOf(this.selectIdPrefix) == 0) {
      let num = this.stringUtil.convertStringToNumber(target.id.substring(this.selectIdPrefix.length), 0);
      let value = target.value;
      if (num >= 0) {
        this.changeSelect(num, value);
      }
    }
  }

  changeSelect(num: number, value: string) {
    this.selectsList[num].value = value;
    console.log('changeSelect()');
    this.selectsList.map(item =>
      console.log('id:' + item.idSelect + ', v:' + item.value + ', cv:' + item.correctValue + ', options:' + item.options));

    if (this.useListOfCases) {
      console.log('this.selectsList: ' + this.selectsList
        .map(item => {
          return item.value + '/' + item.correctValue
        }).join(', '));
      console.log('before: ' + this.listOfCases);
      this.listOfCases = this.selectsList.map(item => item.correctValue);
      let values = this.selectsList.map(item => item.value);
      this.listOfCases = this.listOfCases.filter(item => !values.includes(item));

      console.log('after: ' + this.listOfCases);

      this.listOfCases.sort();

      let actualOneOptions = '<option></option><option>' + this.listOfCases.join('</option><option>') + '</option>';
      for (let i = 0; i < this.selectsList.length; i++) {
        let select = document.getElementById(this.selectsList[i].idSelect) as HTMLSelectElement;
        if (select && this.selectsList[i].value === '') {
          select.innerHTML = actualOneOptions;
        }
      }
    }
  }

  onTextareaKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();

      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Вставляем символ табуляции в текущее место
      const value = this.editingText;
      this.editingText =
        value.substring(0, start) + '\t' + value.substring(end);

      // Обновляем позицию курсора
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      });
    }
  }

  deleteTemplate(id: number) {
    this.deleteContentRequest.emit(id);
  }

  updateContent() {
    this.editingMode = false;
    this.content.text = this.editingText;
    this.contentText = this.editingText.replaceAll('\n', '<br>');
    this.updateContentRequest.emit(this.content);
  }

  convertEditingTextToContent() {
    if (this.useSelectOptions) {
      let styleForSelect = ' style="padding: 4px 10px;" ';
      if (!this.adminMode && this.content.userAnswer.length > 0) {
        styleForSelect += 'disabled ';
      }

      let text = '<p>' + this.editingText.replaceAll('\t', '').replaceAll('\n', '</p><p>') + '</p>';
      let numIdSelect = -1;
      let userAnswers: string[] = this.content.userAnswer.split(',');
      console.log('convertEditingTextToContent(), userAnswers=[' + userAnswers + ']');
      this.contentText = text.split('}')
        .map(part => {
          let arr: string[] = [];
          let arr1 = part.split('{');
          arr.push(arr1[0]);
          if (arr1.length == 2) {
            numIdSelect++;
            let id = this.selectIdPrefix + numIdSelect;
            this.selectsList[numIdSelect] = {
              value: '',
              options: [],
              correctValue: '',
              idSelect: id
            };
            console.log('before if userAnswers.length=' + userAnswers.length + ', numIdSelect=' + numIdSelect);
            if (userAnswers.length > numIdSelect) {
              console.log('   run, userAnswers[numIdSelect]=' + userAnswers[numIdSelect]);
              this.selectsList[numIdSelect].value = userAnswers[numIdSelect];
            }
            arr.push('<select id="' + id + '"' + styleForSelect + '>');
            arr.push('<option></option>');
            let options = arr1[1].split(";");
            for (let option of options) {
              if (option.includes('*')) {
                option = option.replaceAll('*', '').trim();
                this.selectsList[numIdSelect].correctValue = option;
              } else {
                option = option.trim();
              }
              this.selectsList[numIdSelect].options.push(option);
            }
            if (this.useListOfCases) {
              options = this.listOfCases;
            }
            for (let option of options) {
              if (option.includes('*')) {
                option = option.replaceAll('*', '').trim();
              } else {
                option = option.trim();
              }
              arr.push('<option');
              if (this.selectsList[numIdSelect].value === option) {
                arr.push(' selected');
              }
              arr.push('>' + option + '</option>');
            }
            arr.push('</select>');
          }
          return arr.join('');
        }).join('');

    }
  }

  cleanAndUpdateSelects() {
    console.log('cleanAndUpdateSelects()');
    if (this.useSelectOptions) {
      this.listOfCases = this.selectsList.map(item => item.correctValue);
      this.listOfCases.sort();
      let defaultLineOptions = '<option></option><option>' + this.listOfCases.join('</option><option>') + '</option>';
      for (let i = 0; i < this.selectsList.length; i++) {
        this.selectsList[i].value = '';
        let select = document.getElementById(this.selectsList[i].idSelect) as HTMLSelectElement;
        if (select) {
          if (this.useListOfCases) {
            select.innerHTML = defaultLineOptions;
          } else {
            let optionsText = '<option></option>';
            for (let option of this.selectsList[i].options) {
              optionsText += '<option>' + option + '</option>';
            }
            select.innerHTML = optionsText;
          }
        }
      }
    }
  }

  editTemplate() {
    this.editingMode = true;
    this.editingModeRequest.emit();
  }

  clickCheck() {
    if (this.useCheckRequest) {
      this.checkRequest.emit();
      return;
    }
    if (this.useSelectOptions) {
      this.selectsList.map(item =>
        console.log('v=' + item.value + ', cv=' + item.correctValue));

      let score = 3.141592654;
      let answer = '';
      let countOfSuccess = this.selectsList.filter(item => {
        return item.value === item.correctValue
      }).length;
      score = Math.round(100. * countOfSuccess / this.selectsList.length);
      if (score === 0) {
        score = 1;
      }
      answer = this.selectsList.map(item => {
        return item.value
      }).join(',');
      console.log('countOfSuccess=' + countOfSuccess + ', score=' + score + ', answer=' + answer);
      this.sendResult(answer, score);

    }
    this.disabledAllUserElements(true);
  }

  sendResult(answer: string, score: number) {
    this.apiService.saveResult({contentId: this.content.id, answer: answer, score: score}).subscribe({
      next: () => {
        this.content.score = score;
        this.content.userAnswer = answer;
      },
      error: () => {
      }
    })
  }

  disabledAllUserElements(value: boolean) {
    console.log('disabledAllSelectElements, value='+value);
    this.disabledCheckButton = value;
    if (this.useSelectOptions) {
      for (let id of this.selectsList.map(item => item.idSelect)) {
        let select = document.getElementById(id);
        if (select) {
          if (value) {
            select.setAttribute('disabled', 'true');
          } else {
            select.removeAttribute('disabled');
          }
        } else{
          console.log('disabledAllUserElements, not exist select for id='+id);
        }
      }
    }
  }

  clickReset() {
    this.content.score = 0;
    this.content.userAnswer = '';

    if (this.useSelectOptions) {
      this.cleanAndUpdateSelects();
    } else {
      // TESTS
      this.resetRequest.emit();
    }
    // if (this.useSelectOptions) {
    //   for (let i = 0; i < this.listOfCorrectValues.length; i++) {
    //     this.listOfValues[i] = '';
    //   }
    //   this.convertEditingTextToContent();
    // }
    this.sendResult('', 0);
    this.disabledAllUserElements(false);
  }
}
