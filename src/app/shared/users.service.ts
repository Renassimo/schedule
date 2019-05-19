import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Router } from "@angular/router";
import { StatusService } from "./status.service";

@Injectable()
export class UsersService {

    usersChanged = new Subject<User[]>();
    avatarChanged = new Subject<string>();

    private users: User[] = [];

    constructor (
        private statusService: StatusService,
        private router: Router
    ) {}

    fetchUsers() {
        let db = firebase.firestore();
        db.collection('users').orderBy('id', 'asc')
        .onSnapshot(
            querySnapshot => {
                let users = [];
                querySnapshot.forEach(
                    doc => {
                    users.push(doc.data());
                    }
                );
                this.setUsers(users);
            }, error => this.statusService.detectError(error)
        );
    }
    updateUser(doc, data) {
        let db = firebase.firestore();
        db.collection('users').doc(doc).set(data)
        .then(() => {
            this.statusService.stopSpin();
            console.log('Document successfully written!');
            this.router.navigate(['/settings/users']);
        })
        .catch((error) => this.statusService.detectError(error));
    }
    setUsers(users) {
        this.users = users;
        this.usersChanged.next(this.users.slice());
    }
    getUsersLength() {
        return this.users.length;
    }
    getUsers() {
        return this.users.slice();
    }
    getUser(userId: number) {
        return this.users[userId];
    }
    getUData(uid) {
        let uData = {
            active: false,
            id: null,
            uid: uid,
            uLevel: 5
        }
        this.users.forEach(user => {
            if (user.uid == uid) {
                uData = user;
            }
        })
        return uData;
    }
    uploadAvatar(event, uid) {

      let file = event.target.files[0];
    //   let storageRef = firebase.storage().ref('avatars/empty');
      let storageRef = firebase.storage().ref('avatars/' + uid);
      let task = storageRef.put(file);
      task.on('state_changed',
      snapshot => {},
      error => this.statusService.detectError(error),
      () => this.statusService.setMessage('Avatar changed!'))
      

    }
    downloadAvatar(uid) {
        if (uid) {
            let storageRef = firebase.storage().ref('avatars/' + uid);
            storageRef.getDownloadURL().then(url => {
                this.avatarChanged.next(url);
            }).catch(error => {
                if (error.code == 'storage/object-not-found') {
                    firebase.storage().ref('avatars/empty')
                    .getDownloadURL().then(url => {
                        this.avatarChanged.next(url);
                    }).catch(error => {
                        this.statusService.detectError(error);
                    });
                } else {
                    this.statusService.detectError(error);
                }
            });
        }
    }

}
