import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../_models/movie';
import { ApiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL: string = 'http://www.omdbapi.com/?';
  private API_KEY: string = '&apikey=c81f2547';
  private http = inject(HttpClient)

   getMovies(searchTerm: string):Observable<Movie[]> {
      return this.http.get<ApiResponse>(`${this.API_URL}&s=${searchTerm}${this.API_KEY}`).pipe(
        map(response => {
          return response.Search;
        })
      )
   }
   getMovie(id: string): Observable<Movie> {
     return this.http.get<Movie>(`${this.API_URL}i=${id}${this.API_KEY}`)
   }
}
