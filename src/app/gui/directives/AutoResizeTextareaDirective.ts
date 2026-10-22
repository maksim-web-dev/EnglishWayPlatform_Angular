import {AfterViewInit, Directive, ElementRef, SimpleChanges, HostListener, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[autoResize]'
})
export class AutoResizeDirective implements AfterViewInit{
  constructor(private el: ElementRef) {}

  @HostListener('cut')
  @HostListener('paste')
  @HostListener('input')
  @HostListener('ngModelChange')
  onInput() {
    console.log('!!!Change height');
    this.adjustHeight();
  }

  ngAfterViewInit(): void {
    console.log('!!!ngAfterViewInit');
    this.adjustHeight();
  }

  private adjustHeight() {
    const textarea = this.el.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
