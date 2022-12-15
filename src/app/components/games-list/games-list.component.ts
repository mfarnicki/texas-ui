import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take, tap } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  gamesList?: Game[][];

  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.gamesService
      .getAllGames()
      .pipe(take(1))
      .subscribe((response) => {
        this.gamesList = this.gamesArray(response);
      });
  }

  addNewGame(): void {
    this.gamesService
      .addGame()
      .subscribe((result) => this.router.navigate(['/games', result.id]));
  }

  deleteGame(id?: string): void {
    if (id) {
      this.gamesService.deleteGame(id).subscribe((_) => {
        this.gamesList?.forEach(
          (array) => (array = array.filter((e) => e.id != id))
        );
      });
    }
  }

  gamesArray(games: Game[] | undefined): Game[][] {
    let array: Game[][] = [];
    if (games) {
      while (games.length > 0) {
        array.push(games.splice(4));
      }
    }

    return array;
  }
}
