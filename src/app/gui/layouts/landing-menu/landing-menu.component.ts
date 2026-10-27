import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {MenusService} from '../../../services/menus.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing-menu',
  standalone: true,
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './landing-menu.component.html',
  styleUrl: './landing-menu.component.css'
})
export class LandingMenuComponent {
  menu: MenuItemDto[] | undefined;
  currentMenuUrl:string = "";

  constructor(private menusService: MenusService,
              private translate: TranslateService,
              private router: Router) {
    this.menu = menusService.getMenu("LANDING-MAIN-MENU");
    this.currentMenuUrl = router.url;
  }
}
