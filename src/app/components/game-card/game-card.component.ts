import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game?: Game;
  @Output() deleteEvent = new EventEmitter<string>();

  deleteGame(gameId: string) {
    this.deleteEvent.emit(gameId);
  }
}
