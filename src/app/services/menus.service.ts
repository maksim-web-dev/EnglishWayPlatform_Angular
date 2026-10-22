import {Injectable} from '@angular/core';
import {Language} from '../interfaces/Language';
import {Menu} from '../interfaces/Menu';
import {MenuItemDto} from '../interfaces/MenuItemDto';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() {
  }

  menus: Menu[] = [
    {
      description: "LANDING-MAIN-MENU",
      menu: [
        {id:1,name: "LANDING-MAIN_MENU_ITEM1", order: 1, url: "/", img:"", title:"", unitId:0},
        {id:1,name: "LANDING-MAIN_MENU_ITEM2", order: 1, url: "/main", img:"", title:"", unitId:0},
        {id:1,name: "LANDING-MAIN_MENU_ITEM3", order: 1, url: "/main2", img:"", title:"", unitId:0},
        {id:1,name: "LANDING-MAIN_MENU_ITEM4", order: 1, url: "#", img:"", title:"", unitId:0},
      ]
    },
    // {
    //   description: "inner-page-template-menu",
    //   menu: [
    //     {id:1,name: "Home",  order: 1,url: "#", img:"/images/home-icon.png", title:"", lessonId:0},
    //     {id:1,name: "Home2",  order: 1,url: "menu", img:"/images/users-icon.png", title:"", lessonId:0},
    //     {id:1,name: "Home3",  order: 1,url: "#3", img:"/images/download-icon.png", title:"", lessonId:0},
    //     {id:1,name: "Home4",  order: 1,url: "#3", img:"/images/download-icon.png", title:"", lessonId:0},
    //   ]
    //  }
  ]

  getMenu(describe: string):MenuItemDto[] | undefined {
    return this.menus.find(item=>item.description==describe)?.menu;
  }
}
