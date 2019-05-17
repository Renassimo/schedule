import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ScheduleService } from 'src/app/shared/schedule.service';
import { StatusService } from 'src/app/shared/status.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { SettingsService } from 'src/app/settings/settings.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuthService } from 'src/app/auth/auth.service';

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
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ScheduleEditComponent implements OnInit, OnDestroy {


  sets = {};
  settingsSubscription: Subscription;
  monday = moment().isoWeekday(1);
  today = moment();
  weekForm: FormGroup;
  datePicker: FormControl;
  durations = [];
  
  userWeekHours;
  weekHours;

  id;
  year;
  week;

  userSched = [];
  schedSubscription: Subscription;

  realTimeUpdate = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private statusService: StatusService,
    private settingsService: SettingsService,
    private authService: AuthService
    ) { }

  ngOnInit() {

    this.route.parent.params
    .subscribe(
      (params: Params) => {


        let time = moment().isoWeekday(4);
        this.id = +params['id'];

        if (params['year'] && params['week']) {

          this.year = +params['year'];
          this.week = +params['week'];
          time.set('year', this.year).isoWeek(this.week);
          this.fetchWeek(time);

          this.monday = moment().set({year: this.year, week: this.week}).isoWeekday(1);

        } else {

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
        this.datePicker = new FormControl({value: this.monday, disabled: true});

      }
    );

    this.schedSubscription = this.scheduleService.schedChanged.subscribe(
      () => {
        if (this.realTimeUpdate) {
          this.setUserSched(this.id);
          this.realTimeUpdate = false;
        }
      }
    );
    this.settingsSubscription = this.settingsService.settingsChanged.subscribe(
      (settings) => {
        this.sets = settings;
      }
    );

    this.setUserSched(this.id);
    this.detectSetting();

  }
  ngOnDestroy() {
    this.schedSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
    this.realTimeUpdate = true;
  }
  onSubmit() {
    console.log('Submitted:', this.getUserWeek());
    console.log(moment(this.monday));
    this.scheduleService.updateUserWeek(moment(this.monday.isoWeekday(1)), this.userSched, this.id);
    this.realTimeUpdate = true;
  }
  onCancel() {
    console.log('cancelllll');
    this.router.navigate(['/profile/' + this.id + '/' + this.year + '/' + this.week]);
  }
  fetchWeek(date) {
    this.realTimeUpdate = true;
    if (this.isAuthenticated()) {
      this.scheduleService.fetchWeek(date);
    } else {
      this.authService.changeDate(date);
    }
  }
  countDuration(_in, _out, _break) {
    let in_ = moment.duration(_in).as('hours');
    let out_ = moment.duration(_out).as('hours');
    let break_ = moment.duration(_break).as('hours');
    let duration = out_ - in_ - break_;
    if (duration < 0) duration = 0;
    return duration;
  }
  setUserSched(id) {
    if (this.realTimeUpdate) {
      this.userSched = this.scheduleService.getUserSched(id);
      console.log('User sched', this.userSched);
      this.initForm();
      this.displayWeek();
    }
  }
  detectSetting() {
    if (this.isAuthenticated()) {
      this.sets = this.settingsService.settings;
    } else {
      this.sets = {};
    }
  }
  displayWeek() {
    this.userWeekHours = this.scheduleService.getWeekHours('duration', this.id);
    this.weekHours = this.scheduleService.getWeekHours('hours');
  }
  getUserWeek(value = this.weekForm.value) {
    let data = [];
    let weekDuration = 0;
    for (let j = 0; j < 7; j++) {
      let type = value['type' + j], workDay = type === 'Working' || type === 'WFH';
      let _in = value['in' + j], _out = value['out' + j], _break = value['break' + j];
      let duration = 0;
      if (workDay) {
        duration = this.countDuration(_in, _out, _break);
      } else {
        _in = ''; _out = ''; _break = '';
      }
      weekDuration += duration;
      let subData = {
        in: _in,
        out: _out,
        break: _break,
        comment: value['comment' + j],
        type: type,
        workDay: workDay,
        duration: duration
      };
      data.push(subData);
    }
    this.userWeekHours = weekDuration;
    return data;
  }
  onDatepickerChange() {

  }
  private initForm() {
    let controls = {};

    let in_ = '';
    let out = '';
    let break_ = '';
    let type = '';
    let comment = '';

    for (let j = 0; j < 7; j++) {
      controls['in' + j] = new FormControl(in_);
      controls['out' + j] = new FormControl(out);
      controls['break' + j] = new FormControl(break_);
      controls['type' + j] = new FormControl(type);
      controls['comment' + j] = new FormControl(comment);
    }

    if (this.isAuthenticated() && this.userSched) {
      this.userSched.forEach(
        (day, i) => {
          controls['in' + i] = new FormControl(day.in);
          controls['out' + i] = new FormControl(day.out);
          controls['break' + i] = new FormControl(day.break);
          controls['type' + i] = new FormControl(day.type);
          controls['comment' + i] = new FormControl(day.comment, {updateOn: 'blur'});
        }
      );
    }

    this.weekForm = new FormGroup(controls);
    this.weekForm.valueChanges.subscribe((val) => {
      console.log('Val:', val);
      this.userSched = this.getUserWeek(val);
    });
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
