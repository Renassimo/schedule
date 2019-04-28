import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  displayedColumns = ['id', 'name', 'team', 'position', 'level'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  genres: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  teams: string[] = ['Head', 'TA', 'BDA 1', 'BDA 2', 'BDA 3'];
  rooms: string[] = ['400', '401', '402', '405'];
  positions: string[] = ['Director', 'HR', 'Jr. TA', 'Jr. BDA', 'Sr. BDA'];
  edus: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  engs: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  name: string;
  surname: string;
  team: string;
  position: string;
  id: number;
  level: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Rustam', surname: 'Akhmadullin',
  team: 'Head', position: 'Director', level: '1 (Admin)'},
  {id: 2, name: 'Alexandra', surname: 'Lipova',
  team: 'BDA 1', position: 'Sr. BDA', level: '2 (Superviser)'},
  {id: 3, name: 'Nikita', surname: 'Rusin',
  team: 'TA Team Kazan', position: 'Jr. TA', level: '2 (Superviser)'},
  {id: 4, name: 'Renas', surname: 'Sitdikov',
  team: 'TA Team Kazan', position: 'Jr. TA', level: '0 (God)'},
  {id: 5, name: 'Anna', surname: 'Savelyeva',
  team: 'BDA 2', position: 'Jr. BDA', level: '3 (User)'},
  {id: 6, name: 'Rustem', surname: 'Nabiullin',
  team: 'TA Team Kazan', position: 'Jr. TA', level: '3 (User)'},
];
