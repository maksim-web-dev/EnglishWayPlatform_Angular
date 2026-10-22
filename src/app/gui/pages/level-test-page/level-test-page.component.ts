import {Component} from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {LevelTestSectionComponent} from '../../sections/level-test-section/level-test-section.component';
import {LanguageService} from '../../../services/language.service';

@Component({
  selector: 'app-level-test-page',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    LevelTestSectionComponent
  ],
  templateUrl: './level-test-page.component.html',
  styleUrl: './level-test-page.component.css'
})
export class LevelTestPageComponent {
  constructor(private languageService: LanguageService) {
    languageService.initLanguage();
  }
}
