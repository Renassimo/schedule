// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from "@angular/core";
import { StatusService } from '../shared/status.service';
import { UsersService } from '../shared/users.service';
import { SettingsService } from '../settings/settings.service';
import { ScheduleService } from '../shared/schedule.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    token: string;
    uid: string;

    date;

    firebaseConfig = {
        apiKey: 'AIzaSyA8ThV1o_69uZPNRUae18IZWkqQH1plAbU',
        authDomain: 'zi-schedule.firebaseapp.com',
        databaseURL: 'https://zi-schedule.firebaseio.com',
        projectId: 'zi-schedule',
        storageBucket: 'zi-schedule.appspot.com',
        messagingSenderId: '864122784394'
    };

    constructor(
        private statusService: StatusService,
        private usersService: UsersService,
        private settingsService: SettingsService,
        private scheduleService: ScheduleService,
        private router: Router
    ) {}

    initAuthentication() {
        firebase.initializeApp(this.firebaseConfig);
        firebase.auth().onAuthStateChanged(
          (user) => {
          if (user) {
            // User is signed in.
            console.log('User is signed in.');
            this.authenticate();
          } else {
            // No user is signed in.
            console.log('No user is signed in.');
            this.unAuthenticate();
          }
        });
    }
    authenticate() {
        // this.statusService.spin();
        // this.statusService.clearMessages();
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => {
                // if (this.isVerified()) {
                    // this.statusService.stopSpin();
                    this.token = token;
                    this.uid = this.getUID();
                    // this.setData();
                    // this.dataStorageServiceGet.getFlights(this.token, this.uid);
                    this.usersService.fetchUsers();
                    this.settingsService.fetchSettings();
                    this.setWeek();
                // }
                this.statusService.protectOutside();
            }
        ).catch(error => this.detectError(error));
    }
    setWeek() {
        if (this.date) {
            this.scheduleService.fetchWeek(this.date);
        } else {
            this.scheduleService.fetchWeek();
        }
    }
    changeDate(date) {
        this.date = date;
    }
    unAuthenticate() {
        this.token = null;
        this.uid = null;
        // this.uData = null;
        // this.flightsService.dismissFlights();
        this.statusService.protectInside();
    }
    logout() {
        firebase.auth().signOut();
        this.router.navigate(['auth/login']);
    }
    getUID() {
        return this.uid = firebase.auth().currentUser.uid;
    }
    detectError(error) {
        // this.statusService.stopSpin();
        console.log(error);
        console.log(error.code);
        console.log(error.message);
        // this.statusService.setErrorMessage(error.message);
    }
    detectResponse(response) {
        // this.statusService.stopSpin();
        console.log(response);
    }
    signinUser(email: string, password: string) {
        // this.statusService.spin();
        console.log('Current user before:');
        console.log(firebase.auth().currentUser);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            this.detectResponse(response);
            // this.statusService.setSuccessMessage('You are logging in');
            this.router.navigate(['/profile']);
        })
        .catch(error => this.detectError(error));
    }

}