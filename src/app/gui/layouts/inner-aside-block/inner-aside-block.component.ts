import {Component, Input} from '@angular/core';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inner-aside-block',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './inner-aside-block.component.html',
  styleUrl: './inner-aside-block.component.css'
})
export class InnerAsideBlockComponent {
  @Input() menu: MenuItemDto[]=[];
  companyName: string = "ENGLISH WAY";
}
