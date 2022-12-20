import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { PlayerHole } from 'src/app/models/player-hole';
import { Player } from 'src/app/models/player.model';
import { GamesManagerService } from 'src/app/services/games-manager.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppState, GameState } from 'src/app/store/games.state';
import * as GameActions from 'src/app/store/games.action';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit, OnDestroy {
  gameState: GameState = { playerHoles: [] };
  storeSubscription = Subscription.EMPTY;
  idSubscription = Subscription.EMPTY;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gamesManager: GamesManagerService,
    private store: Store<AppState>,
    private localStorage: StorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.localStorage.getPlayerName()) {
      this.toastr.error('Enter player name first!');
      this.router.navigate(['/games']);
    }

    this.storeSubscription = this.store
      .select('gameState')
      .subscribe((state) => {
        console.log('Store state changed', state);
        this.gameState = state;
      });

    this.idSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      const gameId = params.get('gameId');
      if (gameId) {
        this.gamesManager.joinGame(gameId);
      }
    });
  }

  get game(): Game | undefined {
    return this.gameState.currentGame;
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    this.gamesManager.leaveGame();
  }

  addPlayer(playerPosition: number): void {
    const playerName = this.localStorage.getPlayerName();
    if (this.game && playerName) {
      this.store.dispatch(new GameActions.UpdatePlayer([]));
      this.gamesManager.addPlayer(this.game.id, playerPosition, playerName);
    }
  }

  getPlayerInfo(position: number): {
    player?: Player;
    playerHole?: PlayerHole;
    position: number;
  } {
    const player = this.game?.players?.[position];
    const playerHole =
      player &&
      this.gameState.playerHoles.find(
        (hole) => hole?.playerId == player.playerId
      );

    return {
      player,
      playerHole,
      position,
    };
  }

  startGame(): void {
    if (this.game) this.gamesManager.startGame(this.game.id);
  }

  progressGame(): void {
    if (this.game) this.gamesManager.progressGame(this.game.id);
  }

  nextRound(): void {
    if (this.game) this.gamesManager.nextRound(this.game.id);
  }
}
