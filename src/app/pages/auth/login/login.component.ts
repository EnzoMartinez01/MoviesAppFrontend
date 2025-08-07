import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { ProfileService } from '../../../core/services/profiles/profile.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.loading = false;

          // Verificar si el usuario tiene perfiles
          const userId = parseInt(sessionStorage.getItem('idUser') || '0');
          console.log('Checking profiles for user:', userId);
          this.profileService.getProfilesByUser().subscribe({
            next: (profiles) => {
              console.log('Profiles response:', profiles);
              if (profiles && profiles.length > 0) {
                console.log('User has profiles, navigating to /profiles');
                this.router.navigate(['/profiles']);
              } else {
                console.log('User has no profiles');
                if (this.authService.isAdmin()) {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/home']);
                }
              }
            },
            error: (error) => {
              console.log('Error getting profiles:', error);
              if (this.authService.isAdmin()) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']);
              }
            }
          });
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
    }
  }
}
