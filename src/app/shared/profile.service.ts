import { Profile } from "./profile.model";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from "rxjs";
import * as moment from 'moment';
import { Router } from "@angular/router";
import { StatusService } from "./status.service";

@Injectable()
export class ProfileService {

    private profile: Profile;
    profileChanged = new Subject<Profile>();

    unsubscribe = () => {console.log('Unsubscribing...')};

    constructor(
        private router: Router,
        private statusService: StatusService
        ) {}

    fetchProfile(id) {
        this.setProfile([]);
        this.unsubscribe();
        let db = firebase.firestore();
        this.unsubscribe = db.collection('profiles').where('id', '==', id)
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(
                doc => {
                    this.statusService.stopSpin();
                    this.setProfile(doc.data());
                }
            );
        }, error => this.statusService.detectError(error));
    }
    setProfile(data) {
        this.profile = data;
        this.profile['birthday'] = moment(this.profile['birthday']);
        this.profileChanged.next(this.profile);
    }
    updateProfile(doc, data, path) {
        let db = firebase.firestore();
        db.collection('profiles').doc(doc).set(data)
        .then(() => {
            this.statusService.stopSpin();
            console.log('Document successfully written!');
            this.router.navigate([path]);
        })
        .catch((error) => this.statusService.detectError(error));
    }

}
