// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from "@angular/core";
import { StatusService } from '../shared/status.service';
import { UsersService } from '../shared/users.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class AuthService {
    token: string;
    uid: string;

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
        private settingsService: SettingsService
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
                // }
                this.statusService.protectOutside();
            }
        ).catch(error => this.detectError(error));
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
        // this.router.navigate(['']);
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
        })
        .catch(error => this.detectError(error));
    }

}