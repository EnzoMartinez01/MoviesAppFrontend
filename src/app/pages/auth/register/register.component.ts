import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = {
    names: '',
    lastnames: '',
    dni: '',
    telephone: '',
    email: '',
    birthDate: '',
    password: '',
    username: ''
  };

  confirmPassword = '';
  acceptTerms = false;
  loading = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onRegister() {
    if (this.registerData.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.loading = true;

    this.authService.registerUser(this.registerData, 3).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error en registro:', error);
        alert('Error al crear la cuenta. Intenta nuevamente.');
        this.loading = false;
      }
    });
  }
}
