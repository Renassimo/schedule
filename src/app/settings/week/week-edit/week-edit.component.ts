import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ScheduleService } from 'src/app/shared/schedule.service';
import { StatusService } from 'src/app/shared/status.service';
import { SettingsService } from '../../settings.service';
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
  selector: 'app-week-edit',
  templateUrl: './week-edit.component.html',
  styleUrls: ['./week-edit.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class WeekEditComponent implements OnInit, OnDestroy {

  monday = moment().isoWeekday(1);
  weekForm: FormGroup;
  datePicker: FormControl;
  // durations = [];
  
  weekHours;

  // id;
  year;
  week;

  // userSched = [];
  sched = [];
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
    this.statusService.inside();

    this.route.params
    .subscribe(
      (params: Params) => {


        let time = moment().isoWeekday(4);
        // this.id = +params['id'];

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
            this.setSched();
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
          this.setSched();
          this.realTimeUpdate = false;
        }
      }
    );

    this.setSched();

  }
  ngOnDestroy() {
    this.schedSubscription.unsubscribe();
    this.realTimeUpdate = true;
  }
  onSubmit() {
    this.statusService.spin();
    console.log('Submitted:', this.sched);
    console.log(moment(this.monday));
    this.scheduleService.updateWeekParameters(moment(this.monday.isoWeekday(1)), this.sched);
    this.realTimeUpdate = true;
  }
  onCancel() {
    console.log('cancelllll');
    this.router.navigate(['/settings/week/' + this.year + '/' + this.week]);
  }
  fetchWeek(date) {
    this.realTimeUpdate = true;
    if (this.isAuthenticated()) {
      this.statusService.spin();
      this.scheduleService.fetchWeek(date);
    } else {
      this.authService.changeDate(date);
    }
  }
  setSched() {
    if (this.realTimeUpdate) {
      this.sched = this.scheduleService.getSchedParameters();
      console.log('Sched', this.sched);
      this.initForm();
      this.displayWeek();
    }
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  displayWeek() {
    this.weekHours = 0;
    this.sched.forEach(elem => {
      this.weekHours += elem.hours;
    })
  }
  updateSched(value = this.weekForm.value) {
    let sched = [];
    for (let i = 0; i < 7; i++) {
      let subValue = value['duration' + i];
      let subSched = moment.duration(subValue).asHours();
      sched.push(subSched);
    }
    this.sched.forEach((day, j) => {
      day.hours = sched[j];
    }) 
    this.displayWeek();
  }
  onPaste() {
    let sched = this.scheduleService.coppiedWeekParametres;
    sched.forEach(day => {
      day.week = this.week;
    })
    this.sched = sched;
    console.log('Paste:', sched);
    this.initForm();
    this.displayWeek();
  }
  coppiedWeek() {
    return this.scheduleService.coppiedWeekParametres;
  }
  private initForm() {
    let controls = {};

    let duration = '';

    for (let j = 0; j < 7; j++) {
      controls['duration' + j] = new FormControl(duration);
    }

    if (this.isAuthenticated() && this.sched) {
      this.sched.forEach(
        (day, i) => {
          controls['duration' + i] = new FormControl(this.timePickerFormat(day.hours));
        }
      );
    }

    this.weekForm = new FormGroup(controls);
    this.weekForm.valueChanges.subscribe((val) => {
      console.log('Val:', val);
      this.updateSched(val);
    });
  }

  timePickerFormat(time) {
    let answer = '';
    if (time < 24 && time > 0) {
      answer = moment('0:00', 'H:mm').add(time, 'h').format('H:mm');
    }
    return answer;
  }

}
