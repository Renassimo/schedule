import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class SettingsService {

    settings: {};
    settingsChanged = new Subject<{}>();
    uLevels = [
      {value: 0, viewValue: 'God'},
      {value: 1, viewValue: 'Admin'},
      {value: 2, viewValue: 'Superviser'},
      {value: 3, viewValue: 'User'},
    ];

    constructor(
        private router: Router
    ) {}


    fetchSettings() {
        let db = firebase.firestore();
        db.collection('settings').onSnapshot(
            querySnapshot => {
                let settings = {};
                querySnapshot.forEach(
                    doc => {
                        settings[doc.id] = doc.data().values;
                    }
                );
                this.setSettings(settings);
                console.log('Settings: ', this.settings)
            }
        );
    }

    updateSetting(doc, data) {
        let db = firebase.firestore();
        db.collection('settings').doc(doc).set({
            values: data
        })
        .then(() => {
            console.log('Document successfully written!');
            this.router.navigate(['/settings']);
        })
        .catch((error) => console.error('Error writing document: ', error));

    }

    setSettings(settings) {
        this.settings = settings;
        let settingsCopy = {}
        for (var key in this.settings) {
            settingsCopy[key] = this.settings[key];
          }
        this.settingsChanged.next(settingsCopy);
    }

}