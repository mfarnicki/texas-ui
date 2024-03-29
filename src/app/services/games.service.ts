import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';

class GamesService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseApiUrl}/api/Games`);
  }

  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseApiUrl}/api/Games/${id}`);
  }

  addGame(): Observable<Game> {
    return this.http.post<Game>(`${this.baseApiUrl}/api/Games`, null);
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/api/Games/${id}`);
  }
}
