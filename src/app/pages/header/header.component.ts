import { Component, OnInit } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs/operators';
import {AuthenticationService} from '../../core/services/auth/authentication.service';
import {ProfileService} from '../../core/services/profiles/profile.service';
import { TranslationService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbar,
    MatButton,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatFormField,
    MatInput,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMovieDetailPage = false;
  isLoggedIn = false;
  showSearchInput = false;
  searchQuery = '';
  activeProfile: any = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.checkCurrentRoute();
    this.checkAuthStatus();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMovieDetailPage = event.url.includes('/movie/');
      this.checkAuthStatus();
    });
  }

  private checkCurrentRoute() {
    this.isMovieDetailPage = this.router.url.includes('/movie/');
  }

  private checkAuthStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('authToken');
    if (this.isLoggedIn) {
      this.activeProfile = this.profileService.getActiveProfileData();
    } else {
      this.activeProfile = null;
    }
    console.log('Auth status:', this.isLoggedIn);
    console.log('Active profile:', this.activeProfile);
    console.log('Session storage:', {
      token: sessionStorage.getItem('authToken'),
      user: sessionStorage.getItem('idUser'),
      role: sessionStorage.getItem('userRole')
    });
  }

  login() {
    console.log('Login button clicked, navigating to /login');
    this.router.navigate(['/login']);
  }

  changeProfile() {
    this.router.navigate(['/profiles']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('userRole') === 'ADMIN';
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('idUser');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('activeProfile');
        sessionStorage.removeItem('activeProfileData');
        this.isLoggedIn = false;
        this.activeProfile = null;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('idUser');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('activeProfile');
        sessionStorage.removeItem('activeProfileData');
        this.isLoggedIn = false;
        this.activeProfile = null;
      }
    });
  }

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
    if (!this.showSearchInput) {
      this.searchQuery = '';
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } });
      this.showSearchInput = false;
      this.searchQuery = '';
    }
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
