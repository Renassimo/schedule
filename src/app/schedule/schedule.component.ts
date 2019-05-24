import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ScheduleService } from '../shared/schedule.service';
import { User } from '../shared/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../shared/users.service';
import { StatusService } from '../shared/status.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  id;
  user: User;
  private subscriptions = new Subscription();
  idFromParams = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private statusService: StatusService
  ) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        if (params['id']) {
          this.idFromParams = true;
          this.id = +params['id'];
        } else {
          this.idFromParams = false;
          this.setId();
        }
        // this.id = +params['id'];
        this.setUser();
      }
    );

    this.subscriptions.add(this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.setId();
        this.user = users[this.id];
        // console.log('User:', this.user);
      }
    ));

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setUser() {
    if (this.isAuthenticated) {
      this.user = this.usersService.getUser(this.id);
    } else {
      this.user = null;
    }
  }
  setId() {
    if (this.isAuthenticated && !this.idFromParams) {
      this.id = this.statusService.getId();
    }
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
