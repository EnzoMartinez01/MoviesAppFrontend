import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { MoviesService } from '../../../core/services/movies/movies.service';
import { GenreService } from '../../../core/services/movies/genre.service';
import { Movie } from '../../../core/intefaces/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-adm',
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatIcon,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIconButton
  ],
  templateUrl: './movies-adm.component.html',
  styleUrl: './movies-adm.component.css'
})
export class MoviesAdmComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  displayedColumns: string[] = ['image', 'title', 'genre', 'year', 'actions'];

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  Math = Math;

  showEditModal = false;
  showAddModal = false;
  editingMovie: Movie | null = null;
  newMovie: any = {};
  genres: any[] = [];

  constructor(
    private moviesService: MoviesService,
    private genreService: GenreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getAllGenres(0, 100).subscribe({
      next: (response) => {
        this.genres = response.content || [];
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      }
    });
  }

  loadMovies() {
    this.moviesService.getAllMovies(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.movies = response.content || [];
        this.filteredMovies = this.movies;
        this.totalPages = response.totalPages || 0;
        this.totalElements = response.totalElements || 0;
        this.filterMovies();
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }

  filterMovies() {
    if (this.searchTerm.trim()) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.titleMovie.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredMovies = this.movies;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies();
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }

  openAddDialog() {
    this.newMovie = {
      title: '',
      synopsis: '',
      durationInMinutes: null,
      releaseDate: '',
      premiereDate: '',
      language: '',
      ranking: '',
      coverImage: '',
      urlMovie: '',
      urlTrailer: '',
      genre: null
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newMovie = {};
  }

  addMovie() {
    console.log('newMovie data:', this.newMovie);
    console.log('Validation:', {
      title: !!this.newMovie.title?.trim(),
      synopsis: !!this.newMovie.synopsis?.trim(),
      genre: !!this.newMovie.genre,
      genreValue: this.newMovie.genre
    });
    
    if (this.newMovie.title?.trim() && this.newMovie.synopsis?.trim() && this.newMovie.genre) {
      const movieData = {
        ...this.newMovie,
        genre: parseInt(this.newMovie.genre)
      };
      console.log('Sending movieData:', movieData);
      this.moviesService.addMovie(movieData).subscribe({
        next: (response) => {
          console.log('Movie added successfully:', response);
          this.closeAddModal();
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        }
      });
    } else {
      console.log('Validation failed - missing required fields');
    }
  }

  editMovie(movie: Movie) {
    this.editingMovie = { ...movie };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingMovie = null;
  }

  saveMovie() {
    if (this.editingMovie && this.editingMovie.idMovie) {
      const updateData = {
        title: this.editingMovie?.titleMovie,
        synopsis: this.editingMovie?.synopsisMovie,
        releaseDate: this.editingMovie?.releaseDate,
        durationInMinutes: this.editingMovie?.duration,
        ranking: this.editingMovie?.pg,
        language: this.editingMovie?.language,
        genre: this.genres.find(g => g.nameGenre === this.editingMovie?.genreName)?.idGenre || 1,
        urlMovie: this.editingMovie?.movieUrl,
        urlTrailer: this.editingMovie?.urlTrailer,
        coverImage: this.editingMovie?.movieImage,
        premiereDate: this.editingMovie?.releaseDate
      };
      console.log('Update payload:', updateData);
      this.moviesService.updateMovie(this.editingMovie.idMovie, updateData).subscribe({
        next: (response) => {
          console.log('Movie updated successfully:', response);
          this.closeEditModal();
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error updating movie:', error);
        }
      });
    }
  }

  deleteMovie(movie: Movie) {
    if (confirm(`¿Estás seguro de eliminar "${movie.titleMovie}"?`)) {
      this.moviesService.deactivateMovie(movie.idMovie).subscribe({
        next: (response) => {
          console.log('Movie deactivated successfully:', response);
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error deactivating movie:', error);
        }
      });
    }
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
