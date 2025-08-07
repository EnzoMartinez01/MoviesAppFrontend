import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './pages/header/header.component';
import {FooterComponent} from './pages/footer/footer.component';
import { TranslationService } from './core/services/translation/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MoviesApp';

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.initializeTheme();
    this.initializeLanguage();
  }

  initializeTheme() {
    const savedTheme = sessionStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme === 'light' ? 'light-theme' : 'dark-theme';
  }

  initializeLanguage() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const savedLanguage = sessionStorage.getItem('language') || 'es';
      this.translationService.setLanguage(savedLanguage);
    }
  }
}
