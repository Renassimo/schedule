import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  statuses = ['Suggested', 'Occupied', 'Free'];
  genres = ['Business & IT', 'Literature in English'];

  constructor() { }

  ngOnInit() {
  }

}
