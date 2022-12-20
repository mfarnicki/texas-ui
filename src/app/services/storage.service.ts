import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private playerNameKey = 'playerName';

  public getPlayerName(): string | null {
    return localStorage.getItem(this.playerNameKey);
  }

  public setPlayerName(playerName: string): void {
    localStorage.setItem(this.playerNameKey, playerName);
  }

  public clearPlayerName(): void {
    localStorage.removeItem(this.playerNameKey);
  }
}
