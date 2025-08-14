import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TranslationService } from '../../../core/services/translation/translation.service';

@Component({
  selector: 'app-admin',
  imports: [MatIcon],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router, private translationService: TranslationService) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
