import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {


  constructor(
    private statusService: StatusService
    ) { }

  ngOnInit() {
    this.statusService.inside();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
