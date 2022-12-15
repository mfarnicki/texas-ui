import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-player-card[position]',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent {
  @Input() position!: number;
  @Input() player?: Player;
  @Output() joinEvent = new EventEmitter();

  get playerName(): string {
    return this.player?.playerName || `[PLAYER ${this.position + 1}]`;
  }

  join() {
    this.joinEvent.emit();
  }
}
