import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScheduleService } from '../../shared/schedule.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { StatusService } from '../../shared/status.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UsersService } from 'src/app/shared/users.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ScheduleViewComponent  implements OnInit, OnDestroy {

  userWeekHours;
  weekHours;
  datePicker: FormControl;
  id;
  year;
  week;

  monday = moment().isoWeekday(1);
  today = moment();

  usersSubscription: Subscription;
  schedSubscription: Subscription;
  userSched = [];
  idFromParams = false;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private statusService: StatusService,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
    ) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        let time = moment().isoWeekday(4);
        if (params['id']) {
          this.idFromParams = true;
          this.id = +params['id'];
        } else {
          this.idFromParams = false;
          this.setId();
        }

        if (params['year'] && params['week']) {

          this.year = +params['year'];
          this.week = +params['week'];
          time.set('year', this.year).isoWeek(this.week);
          this.fetchWeek(time);
          this.monday = moment().set({year: this.year, week: this.week}).isoWeekday(1);
        }
        else
        {

          this.year = moment().isoWeekday(4).year();
          this.week = moment().isoWeek();
          let yearWeek = this.scheduleService.yearWeek;
          time.set('year', this.year).isoWeek(this.week);

          this.monday = moment().isoWeekday(1);

          if (yearWeek.year === this.year && yearWeek.week === this.week) {
            this.setUserSched(this.id);
          } else {
            this.fetchWeek(time);
          }
        }
        this.datePicker = new FormControl(this.monday);
      }
    );
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      () => {
        this.setId();
      }
    );

    this.schedSubscription = this.scheduleService.schedChanged.subscribe(
      () => {
        this.setUserSched(this.id);
      }
    );

    }
    
    ngOnDestroy() {
      this.schedSubscription.unsubscribe();
    }

    fetchWeek(date) {
      if (this.isAuthenticated()) {
        this.statusService.spin();
        this.scheduleService.fetchWeek(date);
      } else {
        this.authService.changeDate(date);
      }
    }

    displayWeek() {
      this.userWeekHours = this.scheduleService.getWeekHours('duration', this.id);
      this.weekHours = this.scheduleService.getWeekHours('hours');
    }
    
    setUserSched(id) {
      this.userSched = this.scheduleService.getUserSched(id);
      console.log('User sched', this.userSched);
      this.displayWeek();
    }

    changeWeek(next) {
      let days: number;
      if (next) {
        days = 7;
      } else {
        days = -7;
      }
      this.monday.add(days, 'd').isoWeekday(4);
      let year = this.monday.year();
      let week = this.monday.isoWeek();
      this.router.navigate(['/profile/' + this.id + '/' + year + '/' + week]);
    }

    onDatepickerChange() {
      let value = this.datePicker.value.isoWeekday(4);
      let year = value.year();
      let week = value.isoWeek();
      if (year === this.year && week == this.week) {
      } else {
        this.router.navigate(['/profile/' + this.id + '/' + year + '/' + week]);
      }
    }
    onCopyWeek() {
      this.scheduleService.coppiedWeek = this.userSched;
      console.log('Coppied:', this.scheduleService.coppiedWeek);
      this.statusService.setMessage('Choosen week copied!');
    }
    setId() {
      if (this.isAuthenticated && !this.idFromParams) {
        this.id = this.statusService.getId();
      }
    }
    uLevel() {
      return this.statusService.getULevel();
    }
    uId() {
      return this.statusService.getId();
    }
    isAuthenticated() {
      return this.statusService.isAuthenticated();
    }
    isPastWeek() {
      return this.scheduleService.isPastWeek();
    }
    isBeforeCurrentMondayLunch() {
      return this.scheduleService.isBeforeCurrentMondayLunch();
    }

}
