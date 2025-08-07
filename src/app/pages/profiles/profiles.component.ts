import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileService } from '../../core/services/profiles/profile.service';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, MatCard, MatCardContent, MatIcon],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit {
  profiles: any[] = [];
  loading = true;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    const userId = parseInt(sessionStorage.getItem('idUser') || '0');
    console.log('Loading profiles for user:', userId);
    this.profileService.getProfilesByUser().subscribe({
      next: (profiles) => {
        console.log('Profiles loaded:', profiles);
        this.profiles = profiles || [];
        this.loading = false;
      },
      error: (error) => {
        console.log('Error loading profiles:', error);
        this.loading = false;
        this.router.navigate(['/home']);
      }
    });
  }

  selectProfile(profile: any) {
    console.log('Selected profile:', profile);

    if (profile && profile.profileId) {
      this.profileService.setActiveProfile(profile.profileId);
      this.profileService.setActiveProfileData(profile);

      // Redirigir según el rol del usuario
      const role = sessionStorage.getItem('userRole');
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      console.error('Profile or profile ID is missing:', profile);
    }
  }
}
