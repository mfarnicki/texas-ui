import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/models/game.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent {
  @Input() game?: Game;
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private storage: StorageService,
    private toastr: ToastrService
  ) {}

  joinGame(gameId: string) {
    if (!this.storage.getPlayerName()) {
      this.toastr.error('Enter player name first!');
    } else {
      this.router.navigate(['/games', gameId]);
    }
  }

  deleteGame(gameId: string) {
    this.deleteEvent.emit(gameId);
  }
}
