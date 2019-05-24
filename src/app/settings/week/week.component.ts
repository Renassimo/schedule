import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ScheduleService } from 'src/app/shared/schedule.service';
import { StatusService } from 'src/app/shared/status.service';
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
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class WeekComponent implements OnInit {

  weekHours;
  datePicker: FormControl;
  year;
  week;

  monday = moment().isoWeekday(1);
  today = moment();

  private subscriptions = new Subscription();
  sched = [];

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private statusService: StatusService,
    private authService: AuthService,
    private router: Router
    ) { }

    ngOnInit() {
      this.statusService.inside();

      this.route.params
      .subscribe(
        (params: Params) => {
          let time = moment().isoWeekday(4);
  
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
          this.datePicker = new FormControl(this.monday);
        }
      );
  
      this.subscriptions.add(this.scheduleService.schedChanged.subscribe(
        () => {
          this.setSched();
        }
      ));
  
      }
      
      ngOnDestroy() {
        this.subscriptions.unsubscribe();
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
        this.weekHours = 0;
        this.sched.forEach(elem => {
          this.weekHours += elem.hours;
        })
      }
      
      setSched() {
        this.sched = this.scheduleService.getSchedParameters();
        console.log('Week Parameters:', this.sched);
        this.displayWeek();
      }
      onCopyWeek() {
        this.scheduleService.coppiedWeekParametres = this.sched.slice();
        console.log('Coppied:', this.scheduleService.coppiedWeekParametres);
        this.statusService.setMessage('Choosen week parameters copied!');
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
        this.router.navigate(['/settings/week/' + year + '/' + week]);
      }
  
      onDatepickerChange() {
        let value = this.datePicker.value.isoWeekday(4);
        let year = value.year();
        let week = value.isoWeek();
        if (year === this.year && week == this.week) {
        } else {
          this.router.navigate(['/settings/week/' + year + '/' + week]);
        }
      }
      isAuthenticated() {
        return this.statusService.isAuthenticated();
      }
      uLevel() {
        return this.statusService.getULevel();
      }

}
