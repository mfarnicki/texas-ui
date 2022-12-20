import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from './store/games.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Texas';

  constructor(private store: Store<AppState>, private toast: ToastrService) {
    this.store.select('gameState').subscribe((state) => {
      if (state.error) {
        this.toast.error(state.error);
      }
    });
  }
}
