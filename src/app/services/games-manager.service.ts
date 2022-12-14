import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignalrClient } from 'ngx-signalr-websocket';
import { SignalrConnection } from 'ngx-signalr-websocket/lib';
import { map, Observable, EMPTY, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GamesManagerService {
  private connection?: SignalrConnection;
  errors$: Observable<string> = EMPTY;
  gameState$: Observable<Game> = EMPTY;

  constructor(private httpClient: HttpClient) {
    const client = SignalrClient.create(httpClient);
    client
      .connect(`${environment.baseApiUrl}/gameHub`)
      .subscribe((connection) => {
        this.connection = connection;
        this.errors$ = connection
          .on<string[]>('Error')
          .pipe(map((errors) => errors[0]));
        this.gameState$ = this.connection
          .on<[Game]>('GameState')
          .pipe(map((state) => state[0]));
      });
  }

  joinGame(gameId: string, playerNo: number) {
    this.connection?.send('JoinGame', gameId, playerNo);
  }

  leaveGame() {
    this.connection?.send('LeaveGame');
  }

  startGame(gameId: string) {
    this.connection?.send('StartGame', gameId);
  }
}
