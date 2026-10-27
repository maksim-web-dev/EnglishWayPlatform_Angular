import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-editing-buttons-block',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './editing-buttons-block.component.html',
  styleUrl: './editing-buttons-block.component.css'
})
export class EditingButtonsBlockComponent {
  @Input() id: number=0;
  @Input() editSaveButtonVisible: boolean=true;
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter();
  @Output() downEvent: EventEmitter<any> = new EventEmitter();
  @Output() upEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveEvent: EventEmitter<any> = new EventEmitter();
  editMode: boolean = false;
  edit(){
    this.editEvent.emit(this.id);
    this.editMode = true;
  }
  remove(){
    this.removeEvent.emit(this.id);
  }
  down(){
    this.downEvent.emit(this.id);
  }
  up(){
    this.upEvent.emit(this.id);
  }
  save(){
    this.editMode = false;
    this.saveEvent.emit(this.id);
  }
}
