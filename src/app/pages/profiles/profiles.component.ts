import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileService } from '../../core/services/profiles/profile.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, MatCard, MatCardContent, MatIcon, MatButton, FormsModule, MatIconButton],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit {
  profiles: any[] = [];
  loading = true;

  showCreateModal = false;
  creating = false;
  newProfile = { names: '', urlImage: '' };

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog
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

  openCreateProfileModal() {
    if (this.profiles.length >= 4) {
      this.snack.open('Has alcanzado el máximo de 4 perfiles', 'Cerrar', { duration: 3000 });
      return;
    }
    this.newProfile = { names: '', urlImage: '' };
    this.showCreateModal = true;
  }

  // Crear perfil
  createProfile() {
    if (!this.newProfile.names || !this.newProfile.names.trim()) {
      this.snack.open('El nombre del perfil es obligatorio', 'Cerrar', { duration: 2500 });
      return;
    }
    this.creating = true;

    const payload = {
      names: this.newProfile.names.trim(),
      urlImage: this.newProfile.urlImage?.trim() || undefined
    };

    this.profileService.createProfile(payload).subscribe({
      next: () => {
        this.snack.open('Perfil creado correctamente', 'Cerrar', { duration: 2500 });
        this.showCreateModal = false;
        this.creating = false;
        this.loadProfiles();
      },
      error: () => {
        this.snack.open('No se pudo crear el perfil', 'Cerrar', { duration: 3000 });
        this.creating = false;
      }
    });
  }

  closeCreateModal() {
    if (!this.creating) this.showCreateModal = false;
  }

  selectProfile(profile: any) {
    console.log('Selected profile:', profile);

    if (profile && profile.profileId) {
      this.profileService.setActiveProfile(profile.profileId);
      this.profileService.setActiveProfileData(profile);

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
