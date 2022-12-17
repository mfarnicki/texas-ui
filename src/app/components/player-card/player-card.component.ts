import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerHole } from 'src/app/models/player-hole';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent {
  @Input() playerInfo!: {
    player?: Player;
    playerHole?: PlayerHole;
    position: number;
  };
  @Output() addPlayerEvent = new EventEmitter();

  get playerName(): string {
    return (
      this.playerInfo?.player?.playerName ||
      `[PLAYER ${this.playerInfo.position + 1}]`
    );
  }

  addPlayer() {
    this.addPlayerEvent.emit();
  }
}
