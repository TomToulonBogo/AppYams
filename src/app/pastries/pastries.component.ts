import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les pâtisseries
import { Pastrie } from '../pastrie';
import { PASTRIES } from '../mock-pastries';
import { Favorite } from '../pastrie-details/pastrie-details.component';
import { PastrieService } from '../pastrie.service';

@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss']
})
export class PastriesComponent implements OnInit {

  titlePage: string = "Page principale : liste des pâtisseries à gagner";
  pastries: Pastrie[] = PASTRIES;
  selectedPastrie: Pastrie | null = null;
  favoritePastries: Array<Pastrie> = [];
  start = 0;
  end = this.pastries.length / 2;
  filteredPastries: Array<Pastrie> = PASTRIES;
  searchInput: string = ''


  constructor(private service: PastrieService) { }

  ngOnInit() {
    this.changePages();
  }

  onSelect(pastrie: Pastrie): void {
    // console.log(pastrie);
    this.selectedPastrie = pastrie;
  }

  changeParentPreference(id: string) {
    const pastrie = this.pastries.find(p => p.id === id)
    if (pastrie !== undefined) {
      pastrie?.priority === Favorite.NOFAV ? pastrie.priority = Favorite.FAV : pastrie.priority = Favorite.NOFAV;
      if(pastrie.priority === Favorite.FAV) {
        if (this.favoritePastries.length < 3){
        this.favoritePastries.push(pastrie);
        }
        else {
          
        }
      }
      else {
        const index = this.favoritePastries.findIndex(p => p.id === id);
        this.favoritePastries.splice(index, 1);
      }
      console.log(this.favoritePastries)
    }
  }

  changePages() {
    this.filteredPastries = this.service.paginate(this.start, this.end);
  }

  count() {
    console.log(this.pastries.length)
    return this.pastries.length
  }

  searchPastries(word: string): void {
    this.searchInput = word;
    this.filteredPastries = this.service.search(word);
  }
}
