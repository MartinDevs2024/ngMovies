import { Routes } from '@angular/router';
import { Movies } from './pages/movies/movies';
import { MovieDetails } from './pages/movie-details/movie-details';

export const routes: Routes = [
   { path: '', component: Movies},
   { path: 'movies/:id', component: MovieDetails},
   { path: '**', component: Movies, pathMatch: 'full'}
];
