import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-suggested-events',
  templateUrl: './suggested-events.component.html',
  styleUrls: ['./suggested-events.component.sass']
})
export class SuggestedEventsComponent implements OnInit {

  displayedColumns = ['position', 'date', 'name', 'place', 'type'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  name: string;
  date: string;
  place: string;
  type: string;
  position: number;
  status: string;
  votes: number;
  voteStatus: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'ZoomInfo all hands', date: '11 Feb 2018',
  place: 'Office', type: 'Meetings', status: 'occupied',
  votes: 5, voteStatus: 'notVoted'},
  {position: 2, name: 'Kazan office dinner', date: '14 Feb 2019',
  place: 'Office', type: 'Team building', status: 'occupied',
  votes: 35, voteStatus: 'voted'},
  {position: 3, name: 'Seth in Kazan office', date: '21 Mar 2019',
  place: 'Top-Hop', type: 'Meetings', status: 'occupied',
  votes: 25, voteStatus: 'voted'},
  {position: 4, name: 'Friday Movie', date: '19 Apr 2019',
  place: 'Rodina cinema', type: 'Fun', status: 'occupied',
  votes: 15, voteStatus: 'voted'},
  {position: 5, name: 'Friday Poker Evening', date: '1 May 2019',
  place: 'Corston', type: 'Fun', status: 'free',
  votes: 5, voteStatus: 'voted'},
  {position: 4, name: 'Friday Movie', date: '19 Apr 2019',
  place: 'Rodina cinema', type: 'Fun', status: 'occupied',
  votes: 15, voteStatus: 'voted'},
  {position: 5, name: 'Friday Poker Evening', date: '1 May 2019',
  place: 'Corston', type: 'Fun', status: 'free',
  votes: 5, voteStatus: 'voted'},
  {position: 1, name: 'ZoomInfo all hands', date: '11 Feb 2018',
  place: 'Office', type: 'Meetings', status: 'occupied',
  votes: 5, voteStatus: 'notVoted'},
  {position: 2, name: 'Kazan office dinner', date: '14 Feb 2019',
  place: 'Office', type: 'Team building', status: 'occupied',
  votes: 35, voteStatus: 'voted'},
  {position: 3, name: 'Seth in Kazan office', date: '21 Mar 2019',
  place: 'Top-Hop', type: 'Meetings', status: 'occupied',
  votes: 25, voteStatus: 'voted'},
  {position: 4, name: 'Friday Movie', date: '19 Apr 2019',
  place: 'Rodina cinema', type: 'Fun', status: 'occupied',
  votes: 15, voteStatus: 'voted'},
];
