import { Schedule } from "./schedule.model";
import { DateContent } from "./date-content.model";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class ScheduleService implements OnInit {
    week = [];
    userWeek = [];
    zeroDate = new Date(2019, 1, 25, 0, 0, 0, 0);
    private schedule: Schedule[] = [
        new Schedule(
            new Date(2019, 1, 25, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(2, '7:00', '16:00', '1:00', 8, 'w', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'w', true, '')
        ]),
        new Schedule(
            new Date(2019, 1, 26, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'h', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'h', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'h', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'w', true, '')
        ]),
        new Schedule(
            new Date(2019, 1, 27, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'w', true, '')
        ]),
        new Schedule(
            new Date(2019, 1, 28, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(2, '10:00', '20:00', '2:00', 8, 'w', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', false, '')
        ]),
        new Schedule(
            new Date(2019, 2, 1, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'pto', false, '')
        ]),
        new Schedule(
            new Date(2019, 2, 2, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'w', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'w', true, '')
        ]),
        new Schedule(
            new Date(2019, 2, 3, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', false, '')
        ]),
        new Schedule(
            new Date(2019, 2, 4, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', true, '')
        ]),
        new Schedule(
            new Date(2019, 2, 5, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', true, '')
        ]),
        new Schedule(
            new Date(2019, 2, 6, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', true, '')
        ]),
        new Schedule(
            new Date(2019, 2, 7, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(2, '6:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', true, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', true, '')
        ]),
        new Schedule(
        new Date(2019, 2, 8, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', false, '')
        ]),
        new Schedule(
            new Date(2019, 2, 9, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(2, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', false, '')
        ]),
        new Schedule(
            new Date(2019, 2, 10, 0, 0, 0, 0), [
            new DateContent(0, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(1, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(2, '6:00', '18:00', '3:00', 8, 'out', false, ''),
            new DateContent(3, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(4, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(5, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(6, '9:00', '18:00', '1:00', 8, 'out', false, ''),
            new DateContent(7, '9:00', '18:00', '1:00', 8, 'out', false, '')
        ])
    ];

    ngOnInit() {
        // this.zeroDate = new Date(2019, 1, 25, 0, 0, 0, 0);
    }

    getUserWeek(userId: number, date: Date) {
        this.week = [];
        let dateCopy = this.getDateCopy(date);
        const dateDayAbs = dateCopy.getTime() / (1000 * 60 * 60 * 24);
        const zeroDateDayAbs = this.zeroDate.getTime() / (1000 * 60 * 60 * 24);
        console.log('dateDayAbs = ' + dateDayAbs);
        console.log('zeroDateDayAbs = ' + zeroDateDayAbs);
        const num = dateDayAbs - zeroDateDayAbs;
        console.log('num = ' + num);
        // const days = date - zeroDate;
        const monday = dateDayAbs - num % 7;
        dateCopy.setDate(dateCopy.getDate() - (num % 7 + 1));
        console.log('date seted = ' + date);
        console.log('monday = ' + monday);
        const mondayId = monday - zeroDateDayAbs;
        console.log('mondayId = ' + mondayId);
        for (let i = 0; i < 7; i++) {
            dateCopy.setDate(dateCopy.getDate() + 1);
            console.log('date seted = ' + date);
            const day = this.schedule[mondayId + i].dateContent[userId];
            const userDay = {
                day: dateCopy.getDate(),
                month: dateCopy.getMonth(),
                timeIn: day.timeIn,
                timeOut: day.timeOut,
                breakDuration: day.breakDuration,
                duration: day.duration,
                dayType: day.dayType,
                workDay: day.workDay,
                comment: day.comment,
            };
            this.week.push(userDay);
        }
        return this.week;
    }
    getDateCopy(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds());
    }
    getDayName(i) {
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return dayNames[i];
    }
}
