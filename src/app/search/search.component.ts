import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven

import { PastrieService } from '../pastrie.service';
import { Pastrie } from '../pastrie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchValue: EventEmitter<string> = new EventEmitter;

  constructor(private service: PastrieService) { }

  ngOnInit(): void {
   // console.log(this.service.search())
  }

  onSubmit(form: NgForm): void {
    // récupération des données du formulaire
      this. service.search(form.value ["word"]);
      this.searchValue.emit(form.value["word"])
      console.log(form);
    }

    

}
