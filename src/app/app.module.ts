import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { GamesManagerService } from './services/games-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesListComponent,
    GamePageComponent,
    AlertComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
