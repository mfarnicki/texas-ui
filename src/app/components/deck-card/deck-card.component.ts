import { Component, Input } from '@angular/core';
import { Card, Suit } from '../../models/card.model';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.css'],
})
export class DeckCardComponent {
  @Input() card?: Card;

  get cardColor(): string {
    switch (this.card?.suit) {
      case Suit.Heart:
      case Suit.Diamond:
        return 'red';

      case Suit.Spade:
      case Suit.Club:
      default:
        return 'black';
    }
  }

  get cardValue(): string {
    if (!this.card) {
      return '';
    }

    switch (this.card.value) {
      case 1:
        return 'A';

      case 11:
        return 'J';

      case 12:
        return 'Q';

      case 13:
        return 'K';

      default:
        return this.card.value.toString();
    }
  }

  get cardSuit(): string {
    switch (this.card?.suit) {
      case Suit.Spade:
        return '&spades;';

      case Suit.Heart:
        return '&hearts;';

      case Suit.Diamond:
        return '&diams;';

      case Suit.Club:
        return '&clubs;';

      default:
        return '';
    }
  }
}
