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

  @Output() word = new EventEmitter<string>();
  newValue: string = "";

  constructor(private service: PastrieService) { }

  ngOnInit(): void {
  }


  onChangeEmit(word: string) {
    this.word.emit(word);
    this.newValue = word;
    this.service.search(word);
  }
}
