import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';
import { PlayerHole } from '../models/player-hole';
import * as GamesActions from '../store/games.action';
import { AppState } from '../store/games.state';

@Injectable({ providedIn: 'root' })
export class GamesManagerService {
  private hubConnection: HubConnection;
  public allGames$ = new Subject<Game[]>();

  constructor(private store: Store<AppState>) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseApiUrl}/gameHub`)
      .build();
  }

  public startConnection(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR connected!');
          return resolve(true);
        })
        .catch((err: any) => {
          console.log('SignalR connecting, error occured: ' + err);
          reject(err);
        });
    });
  }

  public subscribeListeners() {
    this.hubConnection.on('Error', (error: string) =>
      this.store.dispatch(new GamesActions.SetError(error))
    );

    this.hubConnection.on('GameState', (state: Game) => {
      this.store.dispatch(new GamesActions.UpdateGame(state));
    });

    this.hubConnection.on('PlayerState', (state: PlayerHole[]) => {
      this.store.dispatch(new GamesActions.UpdatePlayer(state));
    });

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

  joinGame(gameId: string) {
    this.hubConnection.send('JoinGame', gameId);
  }

  addPlayer(gameId: string, playerPosition: number, playerName: string) {
    this.hubConnection.send('AddPlayer', gameId, playerPosition, playerName);
  }

  leaveGame() {
    this.hubConnection.send('LeaveGame');
  }

  startGame(gameId: string) {
    this.hubConnection.send('StartGame', gameId);
  }

  progressGame(gameId: string) {
    this.hubConnection.send('ProgressGame', gameId);
  }

  restartGame(gameId: string) {
    this.hubConnection.send('RestartGame', gameId);
  }
}
