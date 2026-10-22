import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {RouterLink} from '@angular/router';
import {EditingButtonsBlockComponent} from "../../layouts/editing-buttons-block/editing-buttons-block.component";

@Component({
  selector: 'app-menu-content',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    EditingButtonsBlockComponent,
    NgIf
  ],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.css'
})
export class MenuContentComponent {
  @Input() menu: MenuItemDto[]=[];
  @Input() editingMode: boolean = false;
  @Input() adminMode: boolean = true;
  @Input() activeMenuItemId: number = 0;

  @Output() menuAction: EventEmitter<number> = new EventEmitter();

  clickMenu(id:number){
    console.log('menu-content, click id='+id);
    this.menuAction.emit(id);
  }
}
