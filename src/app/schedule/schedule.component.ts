import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/profile.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/profile.service';
import { ScheduleService } from '../shared/schedule.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit {

  dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  userId: number;
  user: Profile;
  // today: Date;
  date: Date;
  week;
  weekHours;
  datePicker: FormControl;

  editMode = false;
  chosenDay = 3;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private scheduleService: ScheduleService
    ) { }

  ngOnInit() {
    // this.today = new Date();
    this.date = new Date(2019, 2, 1, 0, 0, 0, 0);
    this.datePicker = new FormControl(this.date);
    this.userId = this.route.snapshot.params['id'];
    // this.user = this.profileService.getUser(this.userId);
    // console.log(this.user);
    this.week = this.scheduleService.getUserWeek(this.userId, this.date);
    this.weekHours = this.getWeekHours(this.week);
    }

    getWeekHours(week) {
      let hours = 0;
      week.forEach(elem => {
        if (elem.workDay) {
          hours += elem.duration;
        }
      });
      return hours;
    }

    changeWeek(next) {
      let days: number;
      if (next) {
        days = 7;
      } else {
        days = -7;
      }
      this.date.setDate(this.date.getDate() + days);
      this.setWeek();
    }

    setWeek() {
      this.week = this.scheduleService.getUserWeek(this.userId, this.date);
      this.weekHours = this.getWeekHours(this.week);
      // console.log('set week = ' + this.date);
    }

    onDatepickerChange() {
      const year = this.datePicker.value.getFullYear();
      const month = this.datePicker.value.getMonth();
      const day = this.datePicker.value.getDate();
      this.date = new Date(year, month, day, 0, 0, 0, 0);
      // console.log(this.datePicker.value);
      this.setWeek();
    }

}
