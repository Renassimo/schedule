import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-position',
  templateUrl: './schedule-position.component.html',
  styleUrls: ['./schedule-position.component.sass']
})
export class SchedulePositionComponent implements OnInit {

  displayedColumns = ['position', 'name', 'mn', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
export interface PeriodicElement {
  name: string;
  mn: string;
  mn2: string;
  tu: string;
  tu2: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Natalia M.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: 'PTO', tu2: '', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Aida K', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: 'OUT', tu2: '', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Anastasia I.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Diyar B.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Aliya Z.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Dinara A.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Anastasia Z.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Albina G.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Anna S.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Shon F.', mn: '8:00 - 17:00', mn2: 'L: 0.5 H: 8,5',
  tu: '8:00 - 17:00', tu2: 'L: 0.5 H: 8,5', weight: 20.1797, symbol: 'Ne'},
];
