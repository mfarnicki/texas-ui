import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { GamesListComponent } from './components/games-list/games-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    component: GamesListComponent,
  },
  {
    path: 'games/:gameId',
    component: GamePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
