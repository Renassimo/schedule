import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

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
