import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GenreService } from '../../../core/services/movies/genre.service';

@Component({
  selector: 'app-genre-adm',
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './genre-adm.component.html',
  styleUrl: './genre-adm.component.css'
})
export class GenreAdmComponent implements OnInit {
  genres: any[] = [];
  filteredGenres: any[] = [];
  searchTerm = '';
  
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  Math = Math;

  showDetailModal = false;
  selectedGenre: any = null;
  showEditModal = false;
  editingGenre: any = null;
  showAddModal = false;
  newGenre: any = {};

  constructor(
    private router: Router,
    private genreService: GenreService
  ) {}

  ngOnInit() {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getAllGenres(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.genres = response.content || [];
        this.filteredGenres = this.genres;
        this.totalPages = response.totalPages || 0;
        this.totalElements = response.totalElements || 0;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
        this.genres = [];
        this.filteredGenres = [];
      }
    });
  }

  filterGenres() {
    if (this.searchTerm.trim()) {
      this.filteredGenres = this.genres.filter(genre =>
        genre.genreName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredGenres = this.genres;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadGenres();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadGenres();
    }
  }

  viewGenreDetail(genre: any) {
    this.selectedGenre = genre;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedGenre = null;
  }

  editGenre(genre: any) {
    this.editingGenre = { ...genre };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingGenre = null;
  }

  saveGenre() {
    if (this.editingGenre && this.editingGenre.idGenre) {
      this.genreService.updateGenre(this.editingGenre.idGenre, this.editingGenre).subscribe({
        next: (response) => {
          console.log('Genre updated successfully:', response);
          this.closeEditModal();
          this.loadGenres();
        },
        error: (error) => {
          console.error('Error updating genre:', error);
        }
      });
    }
  }

  openAddDialog() {
    this.newGenre = {
      genreName: ''
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newGenre = {};
  }

  addGenre() {
    if (this.newGenre.genreName) {
      this.genreService.addGenre(this.newGenre).subscribe({
        next: (response) => {
          console.log('Genre added successfully:', response);
          this.closeAddModal();
          this.loadGenres();
        },
        error: (error) => {
          console.error('Error adding genre:', error);
        }
      });
    }
  }



  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
