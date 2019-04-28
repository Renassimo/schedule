import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.sass']
})
export class EventEditComponent implements OnInit {

  statuses = ['Suggested', 'Approved'];

  constructor() { }

  ngOnInit() {
  }

}
