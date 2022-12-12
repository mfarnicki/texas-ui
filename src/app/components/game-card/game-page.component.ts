import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  game?: Game;

  constructor(
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.gamesService
          .getGame(id)
          .subscribe((result) => (this.game = result));
      }
    });
  }
}
