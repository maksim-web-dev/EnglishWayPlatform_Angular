import {Component} from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {ApiService} from '../../../services/api.service';
import {NgIf} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MenusService} from '../../../services/menus.service';
import {Menu} from '../../../interfaces/Menu';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {InnerAsideBlockComponent} from '../../layouts/inner-aside-block/inner-aside-block.component';
import {InnerMainBlockComponent} from '../../layouts/inner-main-block/inner-main-block.component';

@Component({
  selector: 'app-inner-page-template',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    NgIf,
    InnerAsideBlockComponent,
    InnerMainBlockComponent,
    RouterOutlet
  ],
  templateUrl: './inner-page-template.component.html',
  styleUrl: './inner-page-template.component.css'
})
export class InnerPageTemplateComponent {
  text: string = "";
  mainMenu: MenuItemDto[] = [];
  asideMenu: MenuItemDto[] = [];
  roles: string = "";

  constructor(private apiService: ApiService,
              private router: Router,
              private menusService: MenusService) {
    //this.initMenu();
    this.init();
  }

  initMenu() {
    this.mainMenu = this.menusService.getMenu('inner-page-template-menu') ?? [];
    this.asideMenu = this.menusService.getMenu('inner-page-template-menu') ?? [];
  }

  init() {
    this.checkToken();
    this.apiService.innerPage()
      .subscribe({
        next: value => {
          this.mainMenu = value.mainMenu ?? [];
          this.roles = value.roles;
          //this.asideMenu = value.asideMenu.items ?? [];
          console.log('cabinet.next:value=' + JSON.stringify(value))
          console.log('cabinet.next: mainMenu=' + this.mainMenu)
          console.log('cabinet.next: roles=' + this.roles)
          //this.text = 'next:'+JSON.stringify(value);
        },
        error: value => {
          console.log('error:' + JSON.stringify(value));
          if (value.status == 401) {
            this.logout();
            this.text = "Unauthorized";
          }
        }
      })
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('jwtToken');
    this.checkToken();
  }

  checkToken() {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(["/"]);
    }
  }
}
