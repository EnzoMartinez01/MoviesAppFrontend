import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private selectedGenreSubject = new BehaviorSubject<number | null>(null);
  selectedGenre$ = this.selectedGenreSubject.asObservable();

  setSelectedGenre(genreId: number | null) {
    this.selectedGenreSubject.next(genreId);
  }

  getSelectedGenre(): number | null {
    return this.selectedGenreSubject.value;
  }

  clearFilter() {
    this.selectedGenreSubject.next(null);
  }
}