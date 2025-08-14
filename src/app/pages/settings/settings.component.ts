import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  language: string = 'es';
  theme: string = 'dark';
  notifications: boolean = true;
  autoplay: boolean = true;
  videoQuality: string = 'auto';

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.loadSettings();
    this.applyTheme();
  }

  loadSettings() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.language = sessionStorage.getItem('language') || 'es';
      this.theme = sessionStorage.getItem('theme') || 'dark';
      this.notifications = sessionStorage.getItem('notifications') !== 'false';
      this.autoplay = sessionStorage.getItem('autoplay') !== 'false';
      this.videoQuality = sessionStorage.getItem('videoQuality') || 'auto';
    }
  }

  onLanguageChange() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('language', this.language);
    }
    this.translationService.setLanguage(this.language);
    console.log('Idioma cambiado a:', this.language);
  }

  onThemeChange() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('theme', this.theme);
    }
    this.applyTheme();
    console.log('Tema cambiado a:', this.theme);
  }

  onNotificationsChange() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('notifications', this.notifications.toString());
    }
    console.log('Notificaciones:', this.notifications);
  }

  onAutoplayChange() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('autoplay', this.autoplay.toString());
    }
    console.log('Autoplay:', this.autoplay);
  }

  onVideoQualityChange() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('videoQuality', this.videoQuality);
    }
    console.log('Calidad de video:', this.videoQuality);
  }

  applyTheme() {
    document.body.className = this.theme === 'light' ? 'light-theme' : 'dark-theme';
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
