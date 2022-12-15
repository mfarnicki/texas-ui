import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { StoreModule } from '@ngrx/store';
import { appReducerMap } from './store/games.state';
import { GameCardComponent } from './components/game-card/game-card.component';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { PlayerCardComponent } from './components/player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesListComponent,
    GamePageComponent,
    GameCardComponent,
    DeckCardComponent,
    PlayerCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducerMap),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
