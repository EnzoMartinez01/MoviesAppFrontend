import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = 'es';
  
  private translations: { [key: string]: { [key: string]: string } } = {
    es: {
      // Header
      'header.home': 'Inicio',
      'header.movies': 'Películas',
      'header.login': 'Iniciar sesión',
      'header.profile': 'Mi perfil',
      'header.changeProfile': 'Cambiar perfil',
      'header.admin': 'Modo administrativo',
      'header.settings': 'Configuración',
      'header.logout': 'Cerrar sesión',
      'header.search': 'Buscar películas...',
      
      // Home
      'home.popularMovies': 'Películas Populares',
      'home.recentMovies': 'Películas Recientes',
      'home.seeMore': 'Ver más',
      
      // Movies
      'movies.allMovies': 'Todas las Películas',
      'movies.genres': 'Géneros',
      'movies.loading': 'Cargando películas...',
      'movies.noMovies': 'No se encontraron películas',
      
      // Profile
      'profile.title': 'Mi Perfil',
      
      // Settings
      'settings.title': 'Configuración',
      'settings.general': 'Configuración General',
      'settings.language': 'Idioma:',
      'settings.theme': 'Tema:',
      'settings.notifications': 'Notificaciones:',
      'settings.autoplay': 'Reproducción automática:',
      'settings.videoQuality': 'Calidad de video:',
      'settings.spanish': 'Español',
      'settings.english': 'English',
      'settings.dark': 'Oscuro',
      'settings.light': 'Claro',
      'settings.auto': 'Automática',
      
      // Admin
      'admin.title': 'Panel Administrativo',
      'admin.subtitle': 'Gestiona el contenido y usuarios de la plataforma',
      'admin.movies': 'Películas',
      'admin.moviesDesc': 'Gestionar catálogo de películas',
      'admin.users': 'Usuarios',
      'admin.usersDesc': 'Administrar usuarios del sistema',
      'admin.reviews': 'Reseñas',
      'admin.reviewsDesc': 'Moderar reseñas de usuarios',
      'admin.genres': 'Géneros',
      'admin.genresDesc': 'Gestionar géneros de películas',
      
      // Common
      'common.add': 'Agregar',
      'common.edit': 'Editar',
      'common.delete': 'Eliminar',
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.close': 'Cerrar',
      'common.detail': 'Ver Detalle',
      'common.search': 'Buscar...',
      'common.loading': 'Cargando...',
      'common.noResults': 'No se encontraron resultados',
      'common.all': 'Todos',
      
      // Genres
      'genre.action': 'Acción',
      'genre.comedy': 'Comedia',
      'genre.drama': 'Drama',
      'genre.horror': 'Terror',
      'genre.romance': 'Romance',
      'genre.thriller': 'Suspenso',
      'genre.scifi': 'Ciencia Ficción',
      'genre.fantasy': 'Fantasía',
      'genre.adventure': 'Aventura',
      'genre.animation': 'Animación'
    },
    en: {
      // Header
      'header.home': 'Home',
      'header.movies': 'Movies',
      'header.login': 'Sign in',
      'header.profile': 'My profile',
      'header.changeProfile': 'Change profile',
      'header.admin': 'Admin mode',
      'header.settings': 'Settings',
      'header.logout': 'Sign out',
      'header.search': 'Search movies...',
      
      // Home
      'home.popularMovies': 'Popular Movies',
      'home.recentMovies': 'Recent Movies',
      'home.seeMore': 'See more',
      
      // Movies
      'movies.allMovies': 'All Movies',
      'movies.genres': 'Genres',
      'movies.loading': 'Loading movies...',
      'movies.noMovies': 'No movies found',
      
      // Profile
      'profile.title': 'My Profile',
      
      // Settings
      'settings.title': 'Settings',
      'settings.general': 'General Settings',
      'settings.language': 'Language:',
      'settings.theme': 'Theme:',
      'settings.notifications': 'Notifications:',
      'settings.autoplay': 'Autoplay:',
      'settings.videoQuality': 'Video quality:',
      'settings.spanish': 'Español',
      'settings.english': 'English',
      'settings.dark': 'Dark',
      'settings.light': 'Light',
      'settings.auto': 'Auto',
      
      // Admin
      'admin.title': 'Admin Panel',
      'admin.subtitle': 'Manage platform content and users',
      'admin.movies': 'Movies',
      'admin.moviesDesc': 'Manage movie catalog',
      'admin.users': 'Users',
      'admin.usersDesc': 'Manage system users',
      'admin.reviews': 'Reviews',
      'admin.reviewsDesc': 'Moderate user reviews',
      'admin.genres': 'Genres',
      'admin.genresDesc': 'Manage movie genres',
      
      // Common
      'common.add': 'Add',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.close': 'Close',
      'common.detail': 'View Detail',
      'common.search': 'Search...',
      'common.loading': 'Loading...',
      'common.noResults': 'No results found',
      'common.all': 'All',
      
      // Genres
      'genre.action': 'Action',
      'genre.comedy': 'Comedy',
      'genre.drama': 'Drama',
      'genre.horror': 'Horror',
      'genre.romance': 'Romance',
      'genre.thriller': 'Thriller',
      'genre.scifi': 'Science Fiction',
      'genre.fantasy': 'Fantasy',
      'genre.adventure': 'Adventure',
      'genre.animation': 'Animation'
    }
  };

  constructor() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.currentLanguage = sessionStorage.getItem('language') || 'es';
    }
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('language', language);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key;
  }

  getTranslations(): { [key: string]: string } {
    return this.translations[this.currentLanguage] || {};
  }
}