import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GamesManagerService } from 'src/app/services/games-manager.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  gamesList: Game[] = [];

  constructor(private gamesManager: GamesManagerService) {
    this.gamesManager.allGames$.subscribe((games) => (this.gamesList = games));
  }

  ngOnInit(): void {
    this.gamesManager.startConnection().then(() => {
      this.gamesManager.subscribeListeners();
      this.gamesManager.listGames();
    });
  }

  addNewGame(): void {
    this.gamesManager.newGame();
  }

  deleteGame(gameId: string): void {
    this.gamesManager.deleteGame(gameId);
  }
}
