import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game, GameStatus } from '../../models/game.model';

@Component({
  selector: 'app-dealer-table',
  templateUrl: './dealer-table.component.html',
  styleUrls: ['./dealer-table.component.css'],
})
export class DealerTableComponent {
  statusEnum: typeof GameStatus = GameStatus;
  @Input() game?: Game;
  @Output() startGameEvent = new EventEmitter();
  @Output() progressGameEvent = new EventEmitter();
  @Output() restartGameEvent = new EventEmitter();

  startGame(): void {
    this.startGameEvent.emit();
  }

  progressGame(): void {
    this.progressGameEvent.emit();
  }

  restartGame(): void {
    this.restartGameEvent.emit();
  }
}
