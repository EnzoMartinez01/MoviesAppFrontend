import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {MovieComponent} from './pages/movie/movie.component';
import {SearchComponent} from './pages/search/search.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {ProfilesComponent} from './pages/profiles/profiles.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AdminComponent} from './pages/pagesAdm/admin/admin.component';
import {MoviesAdmComponent} from './pages/pagesAdm/movies-adm/movies-adm.component';
import {UsersAdmComponent} from './pages/pagesAdm/users-adm/users-adm.component';
import {GenreAdmComponent} from './pages/pagesAdm/genre-adm/genre-adm.component';
import {ReviewsAdmComponent} from './pages/pagesAdm/reviews-adm/reviews-adm.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {HelpCenterComponent} from './pages/help-center/help-center.component';
import {ContactComponent} from './pages/contact/contact.component';
import {TermsComponent} from './pages/terms/terms.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {RegisterComponent} from './pages/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie/:idMovie', component: MovieComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'search', component: SearchComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profiles', component: ProfilesComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/movies', component: MoviesAdmComponent},
  { path: 'admin/users', component: UsersAdmComponent},
  { path: 'admin/reviews', component: ReviewsAdmComponent},
  { path: 'admin/genres', component: GenreAdmComponent},
  { path: 'help-center', component: HelpCenterComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: '**', redirectTo: 'home' }
];
