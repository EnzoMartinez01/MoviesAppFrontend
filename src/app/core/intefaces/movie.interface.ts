export interface Movie {
  idMovie: number;
  titleMovie: string;
  synopsisMovie: string;
  releaseDate: string;        // e.g., "2014-11-06"
  duration: number;           // duración en minutos
  pg: string;                 // clasificación por edad, ej. "PG-13"
  language: string;
  genreName: string;
  urlTrailer: string;
  movieImage: string;
  movieUrl: string;
}
