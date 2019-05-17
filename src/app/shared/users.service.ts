import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from "@angular/router";

@Injectable()
export class UsersService {

    usersChanged = new Subject<User[]>();

    private users: User[] = [];

    constructor (
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
            }
        );
    }
    updateUser(doc, data) {
        let db = firebase.firestore();
        db.collection('users').doc(doc).set(data)
        .then(() => {
            console.log('Document successfully written!');
            this.router.navigate(['/settings/users']);
        })
        .catch((error) => console.error('Error writing document: ', error));
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
        let level = 5;
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

}
