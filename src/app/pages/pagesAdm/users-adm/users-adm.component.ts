import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { UsersService } from '../../../core/services/profiles/users.service';

@Component({
  selector: 'app-users-adm',
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatButton,
  ],
  templateUrl: './users-adm.component.html',
  styleUrl: './users-adm.component.css'
})
export class UsersAdmComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm = '';

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  Math = Math;

  expandedUser: any = null;
  userProfiles: any[] = [];
  showDetailModal = false;
  selectedUser: any = null;
  showEditModal = false;
  editingUser: any = null;
  showAddModal = false;
  newUser: any = {};

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers(this.searchTerm, true, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.users = response.content || [];
        this.filteredUsers = this.users;
        this.totalPages = response.totalPages || 0;
        this.totalElements = response.totalElements || 0;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
        this.filteredUsers = [];
      }
    });
  }

  filterUsers() {
    this.currentPage = 0;
    this.loadUsers();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  viewProfiles(user: any) {
    if (this.expandedUser?.idUser === user.idUser) {
      this.expandedUser = null;
      this.userProfiles = [];
    } else {
      this.expandedUser = user;
      this.userProfiles = user.profiles || [];
    }
  }



  viewUserDetail(user: any) {
    this.selectedUser = user;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedUser = null;
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser && this.editingUser.idUser) {
      this.usersService.updateUser(this.editingUser.idUser, this.editingUser).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.closeEditModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }

  openAddDialog() {
    this.newUser = {
      names: '',
      lastnames: '',
      dni: '',
      telephone: '',
      birthDate: '',
      email: '',
      username: '',
      password: ''
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newUser = {};
  }

  addUser() {
    if (this.newUser.names && this.newUser.lastnames && this.newUser.email && this.newUser.username && this.newUser.password) {
      // Aquí iría la llamada al servicio para crear usuario
      console.log('Adding user:', this.newUser);
      this.closeAddModal();
      this.loadUsers();
    }
  }

  deleteUser(user: any) {
    if (confirm(`¿Estás seguro de eliminar al usuario "${user.name}"?`)) {
      console.log('Delete user:', user);
    }
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
