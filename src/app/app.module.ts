import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { StoreModule } from '@ngrx/store';
import { GameCardComponent } from './components/game-card/game-card.component';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { DealerTableComponent } from './components/dealer-table/dealer-table.component';
import { GamesManagerService } from './services/games-manager.service';
import { reducerMap } from './store/games.state';

function initializeSignalR(gamesManagerService: GamesManagerService) {
  return () =>
    gamesManagerService.startConnection().then((connected) => {
      if (connected) {
        gamesManagerService.subscribeListeners();
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesListComponent,
    GamePageComponent,
    GameCardComponent,
    DeckCardComponent,
    PlayerCardComponent,
    DealerTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducerMap),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [GamesManagerService],
      useFactory: initializeSignalR,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
