import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  displayedColumns = ['position', 'name', 'genre', 'occupiedBy', 'occupiedFrom', 'status'];
  displayedColumns2 = ['position', 'name', 'genre', 'suggestedBy', 'votes', 'vote'];
  dataSource = ELEMENT_DATA;
  genres = ['Business & IT', 'Literature in English'];

  constructor(
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.statusService.inside();
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
export interface PeriodicElement {
  name: string;
  link: string;
  genre: string;
  occupiedBy: string;
  occupiedFrom: string;
  position: number;
  status: string;
  votes: number;
  voteStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'O\'Reilly Регулярные выражения', link: 'https://www.ozon.ru/context/detail/id/145821593/',
  genre: 'Business & IT', occupiedBy: 'Almina S.', occupiedFrom: '28 Jan 2019 (3)', status: 'occupied',
  votes: 5, voteStatus: 'notVoted'},
  {position: 2, name: 'Алгоритмы', link: 'https://www.ozon.ru/context/detail/id/139296295/',
  genre: 'Business & IT', occupiedBy: 'Renas S.', occupiedFrom: '26 Jan 2019 (5)', status: 'occupied',
  votes: 35, voteStatus: 'voted'},
  {position: 3, name: 'Ubuntu с нуля', link: 'https://www.ozon.ru/context/detail/id/137731096/',
  genre: 'Business & IT', occupiedBy: 'Abuzyar T.', occupiedFrom: '24 Jan 2019 (7)', status: 'occupied',
  votes: 25, voteStatus: 'voted'},
  {position: 4, name: 'Аналитическая культура', link: 'https://www.ozon.ru/context/detail/id/141457192/',
  genre: 'Business & IT', occupiedBy: 'Rustam A.', occupiedFrom: '22 Jan 2019 (9)', status: 'occupied',
  votes: 15, voteStatus: 'voted'},
  {position: 5, name: 'Работа с Google таблицами.', link: 'https://www.ozon.ru/context/detail/id/142161772/',
  genre: 'Business & IT', occupiedBy: '', occupiedFrom: '', status: 'free',
  votes: 5, voteStatus: 'voted'},
  {position: 6, name: 'Learning Python, 5th Edition', link: 'https://www.amazon.com/Learning-Python-5th-Mark-Lutz/dp/1449355730',
  genre: 'Business & IT', occupiedBy: '', occupiedFrom: '', status: 'free',
  votes: 5, voteStatus: 'notVoted'},
  {position: 7, name: 'O\'Henry - The gift of the Magi', link: 'https://www.ozon.ru/context/detail/id/24447409/',
  genre: 'Literature in English', occupiedBy: 'Natalia M.', occupiedFrom: '1 Jan 2019 (27)', status: 'occupied',
  votes: 5, voteStatus: 'notVoted'},
  {position: 8, name: 'Oscar Wilde - The Picture of Dorian Grey ', link: 'https://www.ozon.ru/context/detail/id/149016681/',
  genre: 'Literature in English', occupiedBy: 'Anastasia T.', occupiedFrom: '10 Dec 2019 (48)', status: 'occupied',
  votes: 5, voteStatus: 'notVoted'},
];
