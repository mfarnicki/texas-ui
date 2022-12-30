import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Game, GameStatus } from 'src/app/models/game.model';
import { PlayerHole } from 'src/app/models/player-hole.model';
import { MoveType, PlayerMove } from 'src/app/models/player-move.model';
import { Player, PlayerStatus } from 'src/app/models/player.model';
import { AppState, GameState } from 'src/app/store/games.state';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  gameStatusEnum: typeof GameStatus = GameStatus;
  playerStatusEnum: typeof PlayerStatus = PlayerStatus;
  moveTypeEnum: typeof MoveType = MoveType;
  storeSubscription = Subscription.EMPTY;

  gameState?: GameState;
  @Input() position!: number;

  @Output() addPlayerEvent = new EventEmitter();
  @Output() playerMoveEvent = new EventEmitter<PlayerMove>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('gameState')
      .subscribe((state) => {
        this.gameState = state;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  get game(): Game | undefined {
    return this.gameState?.currentGame;
  }

  get player(): Player | undefined {
    return this.game?.players?.[this.position];
  }

  get playerName(): string {
    return this.player?.name || `[PLAYER ${this.position + 1}]`;
  }

  get playerHole(): PlayerHole | undefined {
    const player = this.player;
    if (player) {
      return this.gameState?.playerHoles.find(
        (hole) => hole?.playerId == player.id
      );
    }
    return undefined;
  }

  get playerTurn(): boolean {
    return this.gameState?.currentGame?.waitingForId == this.player?.id;
    // return (
    //   !!this.gameState?.currentPlayerId &&
    //   this.gameState.currentPlayerId ==
    //     this.gameState.currentGame?.waitingForId &&
    //   this.gameState.currentPlayerId == this.player?.id
    // );
  }

  addPlayer() {
    this.addPlayerEvent.emit();
  }

  playerMove(move: MoveType) {
    if (this.player) {
      const playerMove: PlayerMove = {
        playerId: this.player.id,
        move: move,
        amount: 0,
      };
      this.playerMoveEvent.emit(playerMove);
    }
  }
}
