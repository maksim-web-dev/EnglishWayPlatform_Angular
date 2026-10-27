import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentDto} from '../../../interfaces/ContentDto';
import {NgIf} from '@angular/common';
import {AutoResizeDirective} from '../../directives/AutoResizeTextareaDirective';
import {ContentTemplateComponent} from '../content-template/content-template.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {QuillEditorComponent} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import {SafeHtmlPipe} from '../../../pipes/SafeHtmlPipe';

@Component({
  selector: 'app-youtube-video',
  standalone: true,
  imports: [
    NgIf,
    AutoResizeDirective,
    ContentTemplateComponent,
    QuillEditorComponent,
    FormsModule,
    SafeHtmlPipe
  ],
  templateUrl: './youtube-video.component.html',
  styleUrl: './youtube-video.component.css'
})
export class YoutubeVideoComponent implements OnInit{
  @Input({required: true})  content!: ContentDto;
  @Input() expand: boolean = true;
  @Input() adminMode: boolean = false;
  @Input() editingMode: boolean = false;
  @Output() updateContentAndListRequest = new EventEmitter<ContentDto>();
  @Output() deleteContentFromListRequest = new EventEmitter<Number>();

  errorText = "Element setup is not finished";
  // TODO: need see cookie in console

  videoUrl: SafeResourceUrl|undefined = undefined;
  videoDefined: boolean = false;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log('youtube-video.ngOnInit(), this.content='+JSON.stringify(this.content));
    this.initVideoUrl();
  }

  initVideoUrl(): void {
    console.log('YUOTUBE: initVideoUrl(), ');
    let originalUrl = this.content.url;
    this.videoDefined = false;
    if(originalUrl==undefined || originalUrl.trim().length==0){
      return;
    }
    const videoIdMatch = originalUrl.match(/v=([^&]+)/);
    const timeMatch = originalUrl.match(/[?&]t=(\d+)s?/);

    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      const startTime = timeMatch ? `?start=${timeMatch[1]}` : '';
      const embedUrl = `https://www.youtube.com/embed/${videoId}${startTime}`;
      this.content.code = embedUrl;

      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      this.videoDefined = true;
      console.log('Embed URL:', embedUrl);
    }
  }
  editContent(){
    this.editingMode = true;
  }
  // saveContent(content:ContentDto){
  //   console.log('youtube-video: saveContent()');
  //   this.editingMode = false;
  //
  //   let urlElement = document.getElementById('youtube-video-content-url-'+content.id) as  HTMLInputElement;
  //   content.url1 = urlElement.value;
  //   content.code = this.convertYoutubeUrlToCode(urlElement.value);
  //   this.content.code = content.code;
  //   this.content.url1 = urlElement.value;
  //   this.initVideoUrl1();
  //   this.updatedAction.emit(this.content);
  // }

  updateContent() {
    this.editingMode = false;
    this.updateContentAndListRequest.emit(this.content);
  }

  deleteContent() {
    this.deleteContentFromListRequest.emit(this.content.id);
  }


}
