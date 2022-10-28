// Component enfant : la classe Input est nécessaire
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pastrie, List } from '../pastrie';

import { INGREDIENTS_LISTS, PASTRIES } from '../mock-pastries';

@Component({
  selector: 'app-pastrie-details',
  templateUrl: './pastrie-details.component.html',
  styleUrls: ['./pastrie-details.component.scss']
})
export class PastrieDetailsComponent implements OnInit {

  @Input() pastrie: Pastrie | null = null; // propriété [pastrie] liée
  @Output() changePreference: EventEmitter<string> = new EventEmitter();

  sens: boolean = true;
  ingredientsLists: List[] = INGREDIENTS_LISTS; // récupération de la liste des listes d'ingrédients
  ingredients: Array<string> = [];
  isFavorite: Favorite = Favorite.NOFAV
  favoritePastriesId: Array<Pastrie> = [];
  pastries: Array<Pastrie> = PASTRIES;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.pastrie);
  }

  ngOnChanges() {
    if (this.pastrie) {
      console.log(this.pastrie);
      // récupération de la liste des ingrédients
      this.ingredients = this.ingredientsLists.find(elem => elem.id === this.pastrie?.id)?.list || [];
    }
  }

  modifyOrder() {
    if (this.sens) {
      this.ingredients.reverse();
      this.sens = false;
    } else {
      this.ingredients.reverse();
      this.sens = true;
    }
  }

  preference(id: string) {
    const find = this.pastries.find(p => p.id === id);
    const index = this.favoritePastriesId.findIndex(favoritePastrie => favoritePastrie.id === id);

    if (find && this.favoritePastriesId.length < 3) this.favoritePastriesId.push(find);
    else if (find && this.favoritePastriesId.length === 3) this.favoritePastriesId.splice(index, 1);
    this.changePreference.emit(id); // émettre l'id de la pâtisserie vers le parent
  }
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

export enum Favorite {
  FAV = 'favorite',
  NOFAV = 'no-favorite'
}
