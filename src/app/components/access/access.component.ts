import {Component, EventEmitter, Input, Output} from '@angular/core';

import {NgIf} from '@angular/common';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';

import {MatRadioModule} from '@angular/material/radio';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent {

  mode = new FormControl('over' as MatDrawerMode);

  @Output() fontSizeChanged = new EventEmitter<number>();
  @Input() mostrarImagenes = true;
  @Output() mostrarImagenesChanged = new EventEmitter<boolean>();


   //API de síntesis de voz del navegador (Web Speech API)
  speechSynthesis: SpeechSynthesis;
  speechUtterance: SpeechSynthesisUtterance;

  defaultCursor: string = 'default';
  increasedCursor: string = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="var(--cursor-size)" height="var(--cursor-size)" viewBox="0 0 18 18"><path fill="yellow" d="M12 0l-6 12h12l-6-12z"/></svg>') 6 6, auto`;

  increaseCursorSize() {
    document.body.style.cursor = this.increasedCursor;
  }

  resetCursorSize() {
    document.body.style.cursor = this.defaultCursor;
  }
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.speechUtterance = new SpeechSynthesisUtterance();
  }

  startReading(): void {
    const textToRead = document.documentElement.innerText;
    this.speechUtterance.text = textToRead;
    this.speechSynthesis.speak(this.speechUtterance);
  }

  pauseReading(): void {
    this.speechSynthesis.pause();
  }

  resumeReading(): void {
    this.speechSynthesis.resume();
  }

  stopReading(): void {
    this.speechSynthesis.cancel();
  }

  increaseFontSize() {
    this.fontSizeChanged.emit(15); // Aumenta el tamaño de fuente en 15 píxeles
  }

  decreaseFontSize() {
    this.fontSizeChanged.emit(-15); // Disminuye el tamaño de fuente en 15 píxeles
  }

  toggleImagenes() {
    this.mostrarImagenes = !this.mostrarImagenes;
    this.mostrarImagenesChanged.emit(this.mostrarImagenes);
  }

}
