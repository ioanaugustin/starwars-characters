import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api/people/';
  private cacheKeyPrefix = 'swapi-page-';
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<any> {
    const cacheKey = this.cacheKeyPrefix + page;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      this.loadingSubject.next(true);
      return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
        tap(data => {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }),
        catchError(error => {
          // Handle error if needed
          return of(null);
        }),
        finalize(() => this.loadingSubject.next(false))
      );
    }
  }

  getCharacterById(id: string): Observable<any> {
    const cacheKey = `swapi-character-${id}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      this.loadingSubject.next(true);
      return this.http.get<any>(`${this.apiUrl}${id}/`).pipe(
        tap(data => {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }),
        catchError(error => {
          // Handle error if needed
          return of(null);
        }),
        finalize(() => this.loadingSubject.next(false))
      );
    }
  }
}
