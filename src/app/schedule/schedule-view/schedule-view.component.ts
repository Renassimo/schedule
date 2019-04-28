import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.sass']
})
export class ScheduleViewComponent implements OnInit {


  days = [
    {day: 28, month: 'Jan', weekday: 'Monday', in: '10:00', out: '20:00',
    lunch: '4:00', hours: 8, duration: 8, typeClass: 'w-day', type: 'W', notes: '', index: 1},

    {day: 29, month: 'Jan', weekday: 'Tuesday', in: '10:00', out: '20:00',
    lunch: '4:00', hours: 8, duration: 8, typeClass: 'w-day', type: 'H', notes: '', index: 2},

    {day: 30, month: 'Jan', weekday: 'Wednesday', in: '10:00', out: '20:00',
    lunch: '4:00', hours: 8, duration: 8, typeClass: 'w-day', type: 'W', notes: '', index: 3},

    {day: 31, month: 'Jan', weekday: 'Thursday', in: '10:00', out: '20:00',
    lunch: '4:00', hours: 8, duration: 8, typeClass: 'w-day', type: 'W', notes: '', index: 4},

    {day: 1, month: 'Feb', weekday: 'Friday', in: '', out: '',
    lunch: '', hours: 0, duration: 8, typeClass: 'out-day', type: 'PTO', notes: '', index: 5},

    {day: 2, month: 'Feb', weekday: 'Saturday', in: '', out: '',
    lunch: '', hours: 0, duration: 0, typeClass: 'out-day', type: 'Out', notes: '', index: 6},

    {day: 3, month: 'Feb', weekday: 'Sunday', in: '', out: '',
    lunch: '', hours: 0, duration: 0, typeClass: 'out-day', type: 'Out', notes: '', index: 7},

  ];

  constructor() { }

  ngOnInit() {
  }

}
