import { Component, OnInit } from '@angular/core';

export interface Times {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.sass']
})
export class ScheduleEditComponent implements OnInit {

  times: Times[] = [
    {value: 0, viewValue: '0:00'},
    {value: 0.5, viewValue: '0:30'},
    {value: 1, viewValue: '1:00'},
    {value: 1.5, viewValue: '1:30'},
    {value: 2, viewValue: '2:00'},
    {value: 2.5, viewValue: '2:30'},
    {value: 3, viewValue: '3:00'},
    {value: 3.5, viewValue: '3:30'},
    {value: 4, viewValue: '4:00'},
    {value: 4.5, viewValue: '4:30'},
    {value: 5, viewValue: '5:00'},
    {value: 5.5, viewValue: '5:30'},
  ];

  dayTypes = [
    'Working',
    'WFH',
    'Out',
    'PTO'
  ];


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
