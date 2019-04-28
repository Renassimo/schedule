import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-common',
  templateUrl: './schedule-common.component.html',
  styleUrls: ['./schedule-common.component.sass']
})
export class ScheduleCommonComponent implements OnInit {
  sorterChosen: string;
  sorters: string[] = ['Team', 'Room', 'Position'];

  constructor() { }

  ngOnInit() {
  }

}
