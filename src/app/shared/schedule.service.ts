import { Schedule } from "./schedule.model";
import { DateContent } from "./date-content.model";
import { Injectable, OnInit } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from "rxjs";
import * as moment from 'moment';
import { StatusService } from "./status.service";
import { Router } from "@angular/router";

@Injectable()
export class ScheduleService {
    week = [];
    userWeek = [];
    zeroDate = new Date(2019, 1, 25, 0, 0, 0, 0);
    thursday = moment().isoWeekday(4);
    yearWeek = {year: this.thursday.year(), week: this.thursday.isoWeek()};

    coppiedWeek;
    coppiedWeekParametres;

    sched;
    schedChanged = new Subject<[]>();

    blankDay = {
        break: '',
        comment: '',
        duration: 0,
        in: '',
        out: '',
        type: 'Out',
        workDay: false        
    };

    unsubscribe = () => {console.log('Unsubscribing...')};


    constructor (
        private statusService: StatusService,
        private router: Router
    ) {}

    fetchWeek(thursday = this.thursday) {
        thursday.isoWeekday(4);
        const year = thursday.year();
        this.yearWeek.year = year;
        const week = thursday.isoWeek();
        this.yearWeek.week = week;

        this.unsubscribe();

        let db = firebase.firestore();
        this.unsubscribe = db.collection('schedule-' + year).where('week', '==', week).orderBy('weekday', 'asc')
        .onSnapshot(
            querySnapshot => {
                let sched = [];
                this.statusService.stopSpin();
                querySnapshot.forEach(
                    doc => {
                    sched.push(doc.data());
                    }
                );

                if (sched.length < 1) {
                    console.log('Kutak!');
                    for (let i = 1; i < 8; i++) {
                        let hours = 8;
                        if (i > 5) {
                            hours = 0;
                        }
                        sched.push({
                            hours: hours,
                            week: week,
                            weekday: i
                        });
                    }
                }
                console.log('fetching sched', sched);
                this.setSched(sched);
            }, error => this.statusService.detectError(error)
        );

    }
    updateUserWeek(monday: moment.Moment, data, id) {
        let thursday = moment(monday).isoWeekday(4);
        const mainYear = thursday.year();
        const week = thursday.isoWeek();

        let sched = this.sched.slice();

        let db = firebase.firestore();

        data.forEach((day, i) => {
            this.statusService.spin();
            let year = monday.isoWeekday(i + 1).year();
            let month = 1 + monday.isoWeekday(i + 1).month();
            let date = monday.isoWeekday(i + 1).date();

            sched[i]['wr' + id] = day;

            db.collection('schedule-' + mainYear).doc('day-' + year + '-' + month + '-' + date)
            .set(sched[i])
            .then(() => {
                this.statusService.stopSpin();
                console.log("Document successfully updated!");
                this.router.navigate(['/profile/' + id + '/' + mainYear + '/' + week]);
            }, error => this.statusService.detectError(error));

        });
        console.log('Updated sched:', sched);
    }
    updateWeekParameters(monday: moment.Moment, data,) {
        let thursday = moment(monday).isoWeekday(4);
        const mainYear = thursday.year();
        const week = thursday.isoWeek();

        let sched = this.sched.slice();

        let db = firebase.firestore();


        data.forEach((day, i) => {
            let year = monday.isoWeekday(i + 1).year();
            let month = 1 + monday.isoWeekday(i + 1).month();
            let date = monday.isoWeekday(i + 1).date();

            sched[i].hours = day.hours;

            db.collection('schedule-' + mainYear).doc('day-' + year + '-' + month + '-' + date)
            .set(sched[i])
            .then(() => {
                this.statusService.stopSpin();
                console.log("Document successfully updated!");
                this.router.navigate(['/settings/week/' + mainYear + '/' + week]);
            }, error => this.statusService.detectError(error));

        });
        console.log('Updated sched:', sched);

    }
    setSched(data) {
        this.sched = data;
        this.schedChanged.next(this.sched.slice());
    }
    getSched() {
        return this.sched;
    }
    getSchedParameters() {
        let sched = []
        if (this.isAuthenticated && this.sched) {
            this.sched.forEach(elem => {
                sched.push({
                    hours: elem.hours,
                    week: elem.week,
                    weekday: elem.weekday
                })
            });
        }
        return sched;
    }
    getUserSched(id) {
        let userSched = [];
        if (this.isAuthenticated && this.sched) {
          this.sched.forEach(elem => {
              if (elem['wr' + id]) {
                userSched.push(elem['wr' + id]);
              } else {
                userSched.push(this.blankDay);
              }
          });
        }
        return userSched;
    }
    getWeekHours(option, id = null) {
      let hours = 0;
      if (this.sched) {
        if (option === 'hours') {
            this.sched.forEach(elem => {
                if (elem[option]) {
                    hours += elem[option];
                }
            });
        } else if (option === 'duration') {
            this.sched.forEach(elem => {
                if (elem['wr' + id]) {
                    hours += elem['wr' + id][option];
                }
            });
        }
      }
      return hours;
    }
    isAuthenticated() {
      return this.statusService.isAuthenticated();
    }
    isPastWeek() {
        let currentWeek = moment().isoWeek();
        let currentYear = moment().year();
        if (currentYear > this.yearWeek.year) {
            return true;
        } else {
            if (currentWeek > this.yearWeek.week) {
                return true;
            } else {
                return false;
            }
        }
    }
    isBeforeCurrentMondayLunch() {
        if (this.isPastWeek()) {
            return false;
        } else {
            return moment()
            .isBefore(moment().year(this.yearWeek.year).isoWeek(this.yearWeek.week).isoWeekday(1)
            .hour(14).minute(0).second(0).millisecond(0));
        }
    }
    
}
