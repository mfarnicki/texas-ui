import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GamesManagerService } from 'src/app/services/games-manager.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  subscription: Subscription = Subscription.EMPTY;
  error?: string;

  constructor(private gamesManager: GamesManagerService) {}

  ngOnInit(): void {
    this.subscription = this.gamesManager.errors$.subscribe((error) => {
      this.error = error[0];
      this.displayAlert(error[0]);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayAlert(error: string): void {
    console.log(error);
  }
}
