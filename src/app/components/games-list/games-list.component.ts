import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];

  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.gamesService
      .getAllGames()
      .pipe(take(1))
      .subscribe((response) => {
        this.games = response;
      });
  }

  addNewGame(): void {
    this.gamesService.addGame().subscribe((result) => this.games?.push(result));
  }

  deleteGame(id: string): void {
    this.gamesService.deleteGame(id).subscribe((_) => {
      this.games = this.games?.filter((e) => e.id !== id);
    });
  }
}
