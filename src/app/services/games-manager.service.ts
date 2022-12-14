import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignalrClient } from 'ngx-signalr-websocket';
import { SignalrConnection } from 'ngx-signalr-websocket/lib';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';
import * as GamesActions from '../store/games.action';
import { AppState } from '../store/games.state';

@Injectable({
  providedIn: 'root',
})
export class GamesManagerService {
  private connection?: SignalrConnection;

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
    const client = SignalrClient.create(httpClient);
    client
      .connect(`${environment.baseApiUrl}/gameHub`)
      .subscribe((connection) => {
        this.connection = connection;
        this.connection
          .on<string[]>('Error')
          .subscribe((errors) =>
            this.store.dispatch(new GamesActions.SetError(errors[0]))
          );

        this.connection
          .on<[Game]>('GameState')
          .subscribe((state) =>
            this.store.dispatch(new GamesActions.UpdateGame(state[0]))
          );
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
