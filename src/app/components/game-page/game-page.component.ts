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
import { GamesManagerService } from 'src/app/services/games-manager.service';
import { GamesService } from 'src/app/services/games.service';
import { AppState } from 'src/app/store/games.state';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit, OnDestroy {
  game?: Game;
  error?: string;
  @ViewChild('playerName') playerNameInput!: ElementRef;
  subscriptions: Subscription = Subscription.EMPTY;

  constructor(
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute,
    private gamesManager: GamesManagerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.subscriptions = this.store
      .select('gameState')
      .subscribe((state) => {
        console.log(state);
        this.game = state.currentGame;
        this.error = state.error;
      });

    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params) => {
        const gameId = params.get('gameId');
        if (gameId) {
          this.gamesManager.initGame(gameId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.gamesManager.leaveGame();
  }

  joinGame(playerPosition: number): void {
    const playerName = this.playerNameInput.nativeElement.value;
    if (this.game && playerName)
      this.gamesManager.joinGame(this.game.id, playerPosition, playerName);
  }

  startGame(): void {
    if (this.game) this.gamesManager.startGame(this.game.id);
  }
}
