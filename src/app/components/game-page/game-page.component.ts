import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { PlayerHole } from 'src/app/models/player-hole';
import { Player } from 'src/app/models/player.model';
import { GamesManagerService } from 'src/app/services/games-manager.service';
import { AppState, GameState } from 'src/app/store/games.state';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit, OnDestroy {
  @ViewChild('playerName') playerNameInput!: ElementRef;

  gameState: GameState = {};
  storeSubscription = Subscription.EMPTY;
  idSubscription = Subscription.EMPTY;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesManager: GamesManagerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('gameState')
      .subscribe((state) => (this.gameState = state));

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
    const playerName = this.playerNameInput.nativeElement.value;
    if (this.game && playerName)
      this.gamesManager.addPlayer(this.game.id, playerPosition, playerName);
  }

  getPlayerInfo(position: number): {
    player?: Player;
    playerHole?: PlayerHole;
    position: number;
  } {
    const player = this.game?.players?.[position];
    const playerHole =
      player &&
      this.gameState.playerHoles &&
      this.gameState.playerHoles.find(
        (hole) => hole.playerId == player.playerId
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

  restartGame(): void {
    if (this.game) this.gamesManager.restartGame(this.game.id);
  }
}
