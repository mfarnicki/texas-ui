import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';
import * as GamesActions from '../store/games.action';
import { AppState } from '../store/games.state';

@Injectable({
  providedIn: 'root',
})
export class GamesManagerService {
  private hubConnection: HubConnection;
  public allGames$ = new Subject<Game[]>();

  constructor(private store: Store<AppState>) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseApiUrl}/gameHub`)
      .build();
  }

  public startConnection() {
    return new Promise((resolve, reject) => {
      if (this.hubConnection.state === HubConnectionState.Connected) {
        return resolve(void 0);
      }

      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connected!');
          return resolve(void 0);
        })
        .catch((err: any) => {
          console.log('SignalR connecting, error occured: ' + err);
          reject(err);
        });
    });
  }

  public subscribeListeners() {
    this.hubConnection.on('Error', (errors: string[]) =>
      this.store.dispatch(new GamesActions.SetError(errors[0]))
    );

    this.hubConnection.on('GameState', (state: Game[]) =>
      this.store.dispatch(new GamesActions.UpdateGame(state[0]))
    );

    this.hubConnection.on('AllGames', (games: Game[]) => {
      this.allGames$.next(games);
    });
  }

  newGame() {
    this.hubConnection.send('NewGame');
  }

  listGames() {
    this.hubConnection.send('ListGames');
  }

  deleteGame(gameId: string) {
    this.hubConnection.send('DeleteGame', gameId);
  }

  initGame(gameId: string) {
    this.hubConnection.send('InitGame', gameId);
  }

  joinGame(gameId: string, playerPosition: number, playerName: string) {
    this.hubConnection.send('JoinGame', gameId, playerPosition, playerName);
  }

  leaveGame() {
    this.hubConnection.send('LeaveGame');
  }

  startGame(gameId: string) {
    this.hubConnection.send('StartGame', gameId);
  }
}
