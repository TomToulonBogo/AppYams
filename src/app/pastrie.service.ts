import { Injectable } from '@angular/core';
import { PASTRIES, INGREDIENTS_LISTS } from './mock-pastries';
import { Pastrie } from './pastrie';
import { List } from './pastrie';

@Injectable({
  providedIn: 'root'
})
export class PastrieService {

  constructor() { }

  pastries: Array<Pastrie> = PASTRIES;
  ingredientsList: Array<List> = INGREDIENTS_LISTS;
  searchPastries: Array<Pastrie> = [];

  getPastries(): Array<Pastrie> {
    return this.pastries.sort((a, b) => {
      return b.quantity - a.quantity;
    })
  }

  getPastrie(id: string): Pastrie | undefined {
    return this.pastries.find(p => p.id === id);
  }

  getPastrieIngredientsList(id: string): List['list'] | undefined {
    return this.ingredientsList.find(i => i.id === id)?.list;
  }

  paginate(start: number, end: number): Array<Pastrie> {
    return this.searchPastries = this.pastries.slice(start, end);

  }

  search(word: string): Array<Pastrie> {
    return !word ? this.searchPastries : this.pastries.filter(p => p.name === word)
  }
}