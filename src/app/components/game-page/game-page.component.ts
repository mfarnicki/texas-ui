import { Component, OnDestroy, OnInit } from '@angular/core';
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
  subscriptions: Subscription = Subscription.EMPTY;

  constructor(
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute,
    private gamesManager: GamesManagerService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.gamesService
          .getGame(id)
          .subscribe((result) => (this.game = result));
      }
    });

    this.subscriptions.add(
      this.store.select('gameState').subscribe((state) => {
        console.log(state);
        this.game = state.currentGame;
        this.error = state.error;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.gamesManager.leaveGame();
  }

  joinGame(playerNo: number): void {
    if (this.game) this.gamesManager.joinGame(this.game?.id, playerNo);
  }

  startGame(): void {
    if (this.game) this.gamesManager.startGame(this.game?.id);
  }
}
