import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScheduleService } from '../shared/schedule.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { StatusService } from '../shared/status.service';
import { AuthService } from '../auth/auth.service';
import { FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/users.service';
import { SettingsService } from '../settings/settings.service';

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
  selector: 'app-schedule-common',
  templateUrl: './schedule-common.component.html',
  styleUrls: ['./schedule-common.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ScheduleCommonComponent implements OnInit, OnDestroy {

  displayedColumns = ['pos', 'worker', 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
  dayColumns = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  datePicker: FormControl;
  private subscriptions = new Subscription();
  type: string;
  year: number;
  week: number;
  sched;
  users: User[];
  sets;

  typedSched;

  monday = moment().isoWeekday(1);
  today = moment();

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private statusService: StatusService,
    private authService: AuthService,
    private usersService: UsersService,
    private settingsService: SettingsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.statusService.inside();

    this.route.params.subscribe((params: Params) => {

      console.log('params:', params);

      if (params['type']) {
        this.type = params['type'];
        if (!this.isRightType(this.type)) {
          this.type = null;
        }
      } else {
        this.type = null;
      }
      if (params['year'] && params['week']) {
        this.year = +params['year'];
        this.week = +params['week'];
      } else {
        this.year = moment().isoWeekday(4).year();
        this.week = moment().isoWeekday(4).isoWeek();
      }
      console.log('Params:', this.type, this.year, this.week);
      this.setParams();
    });

    this.subscriptions.add(this.scheduleService.schedChanged.subscribe(
      () => {
        this.setSched();
      }
    ));

    this.subscriptions.add(this.usersService.usersChanged.subscribe(
      () => {
        this.setUsers();
      }
    ));
    this.subscriptions.add(this.settingsService.settingsChanged.subscribe(
      () => {
        this.detectSetting();
      }
    ));

    this.setUsers();
    this.detectSetting();

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  setParams() {
    let time = moment().isoWeekday(4);

    if (this.year && this.week) {
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
        this.setSched();
      } else {
        this.fetchWeek(time);
      }
    }
    this.datePicker = new FormControl(this.monday);

  }
  fetchWeek(date) {
    if (this.isAuthenticated()) {
      this.statusService.spin();
      this.scheduleService.fetchWeek(date);
    } else {
      this.authService.changeDate(date);
    }
  }
  setSched() {
    this.sched = this.scheduleService.getSched();
    console.log('Shed:',this.sched);
    this.setTypedSched(this.type);
  }
  setUsers() {
    if (this.isAuthenticated()) {
      this.users = this.usersService.getUsers();
      console.log('Users:',this.users);
      this.setTypedSched(this.type);
    }
  }
  detectSetting() {
    if (this.isAuthenticated()) {
      this.sets = this.settingsService.settings;
      console.log('Sets:',this.sets);
      
      this.setTypedSched(this.type);
    }
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
    if (this.isRightType(this.type)) {
      this.router.navigate(['/schedule/' + this.type + '/' + year + '/' + week]);
    }
  }
  onDatepickerChange() {
    let value = this.datePicker.value.isoWeekday(4);
    let year = value.year();
    let week = value.isoWeek();
    if (year === this.year && week == this.week) {
    } else {
      if (this.isRightType(this.type)) {
        this.router.navigate(['/schedule/' + this.type + '/' + year + '/' + week]);
      }
    }
  }
  isRightType(type) {
    return type == 'team' || type == 'room' || type == 'position';
  }
  setTypedSched(type) {
    this.typedSched = null;
    if (this.isRightType(type) && this.sched) {
      const titles = this.getTitles(type);
      const sorted = this.sortByTypes(type);
      const hours = this.scheduleService.getWeekHours('hours');
      this.typedSched = [];
      sorted.forEach(elem => {
        let users = [];
        elem.ids.forEach(elem => {

          let user = {
            id: elem,
            name: this.users[elem]['name'],
            surname: this.users[elem]['surname'],
            tit1: this.users[elem][titles.tit1],
            tit2: this.users[elem][titles.tit2],
            duration: this.scheduleService.getWeekHours('duration', elem),
            schedule: this.scheduleService.getUserSched(elem)
          };

          users.push(user);
        });
        let item = {
          type: elem.type,
          users: users,
          hours: hours
        }
        this.typedSched.push(item);
      });
      console.log('By ' + type + 's:', this.typedSched);
    }
  }
  getTitles(type) {
    let titles;
    if (type == 'team') {
      titles = {tit1: 'position', tit2: 'room'};
    } else if (type == 'room') {
      titles = {tit1: 'position', tit2: 'team'};
    } else if (type == 'position') {
      titles = {tit1: 'team', tit2: 'room'};
    }  
    return titles;
  }
  sortByTypes(type) {
    let answer = [];
    if (this.isRightType(type) && this.sets && this.users) {
      let sorted = [];
      this.sets[type + 's'].forEach((unit) => {
        let ids = [];
        this.users.forEach((user) => {
          if (unit == user[type]) {
            ids.push(user.id);
          }
        })
        sorted.push({type: unit, ids: ids});
      });
      sorted.forEach((item) => {
        if (item.ids.length > 0) {
          answer.push(item);
        }
      })
    }
    return answer;
  }
  formatDuration(dur) {
    return moment.duration(dur).asHours();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
