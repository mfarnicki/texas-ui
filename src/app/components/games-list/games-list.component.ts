import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit, OnDestroy {
  gamesList?: Game[];
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.gamesService
      .getAllGames()
      .subscribe((response) => {
        this.gamesList = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = Subscription.EMPTY;
  }

  addNewGame(): void {
    this.gamesService
      .addGame()
      .subscribe((result) => this.router.navigate(['/games', result.id]));
  }

  deleteGame(id?: string): void {
    if (id) {
      this.gamesService.deleteGame(id).subscribe((_) => {
        this.gamesList = this.gamesList?.filter((e) => e.id !== id);
      });
    }
  }
}
