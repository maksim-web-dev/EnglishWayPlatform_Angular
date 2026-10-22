import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LanguageSelectComponent} from '../../layouts/language-select/language-select.component';
import {LandingMenuComponent} from '../../layouts/landing-menu/landing-menu.component';
import {RouterLink} from '@angular/router';
import {LanguageService} from '../../../services/language.service';
import {LoginDialogComponent} from '../../dialog/login-dialog/login-dialog.component';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {LandingMainSectionComponent} from '../../sections/landing-main-section/landing-main-section.component';
import {LevelTestMarkService} from '../../../services/level-test-mark.service';
import {LandingCardSectionComponent} from '../../sections/landing-card-section/landing-card-section.component';
import {LandingPolygonSectionComponent} from '../../sections/landing-polygon-section/landing-polygon-section.component';
import {LandingLevelSectionComponent} from '../../sections/landing-level-section/landing-level-section.component';
import {LandingReviewsSectionComponent} from '../../sections/landing-reviews-section/landing-reviews-section.component';
import {LandingStartSectionComponent} from '../../sections/landing-start-section/landing-start-section.component';
import {LandingFooterSectionComponent} from '../../sections/landing-footer-section/landing-footer-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  providers: [LoginDialogComponent],
  imports: [
    TranslatePipe,
    LanguageSelectComponent,
    LandingMenuComponent,
    RouterLink,
    LoginDialogComponent,
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    LandingMainSectionComponent,
    LandingCardSectionComponent,
    LandingPolygonSectionComponent,
    LandingLevelSectionComponent,
    LandingReviewsSectionComponent,
    LandingStartSectionComponent,
    LandingFooterSectionComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {


  constructor(private translate: TranslateService,
              private langService: LanguageService,
              private loginDialogComponent: LoginDialogComponent,
              private levelTestMarkService:LevelTestMarkService) {

  }

  ngOnInit() {
    console.log('LandingPageComponent.ngOnInit(), check if need this method');
    this.langService.initLanguage();
    this.levelTestMarkService.freeLevelTestInfo();
  }



}
