import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesManagerService } from 'src/app/services/games-manager.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  gamesList$: Observable<Game[]>;
  playerName?: string;
  edit: boolean = true;

  constructor(
    private gamesManager: GamesManagerService,
    private storage: StorageService,
    private toast: ToastrService
  ) {
    this.gamesList$ = this.gamesManager.allGames$.asObservable();
  }

  ngOnInit(): void {
    this.gamesManager.listGames();
    this.playerName = this.storage.getPlayerName() || undefined;
    this.edit = !this.playerName;
  }

  addNewGame(): void {
    this.gamesManager.newGame();
  }

  deleteGame(gameId: string): void {
    this.gamesManager.deleteGame(gameId);
  }

  changeName() {
    this.edit = true;
    this.storage.clearPlayerName();
  }

  addPlayer() {
    if (!this.playerName) {
      this.toast.error("Player name can't be empty");
    } else {
      this.storage.setPlayerName(this.playerName);
      this.edit = false;
    }
  }
}
