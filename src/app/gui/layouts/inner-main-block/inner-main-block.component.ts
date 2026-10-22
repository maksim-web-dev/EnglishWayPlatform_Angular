import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {NgClass, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inner-main-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './inner-main-block.component.html',
  styleUrl: './inner-main-block.component.css'
})
export class InnerMainBlockComponent {
  @Input() menu: MenuItemDto[] = [];
  @Input() currentPageByMenuItem: string = "Home";
  @Output() logoutEvent = new EventEmitter();
  @Input() roles: string = "";

  logout() {
    this.logoutEvent.emit();
  }
}
