import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Subject } from "rxjs";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Router } from "@angular/router";

@Injectable()
export class UsersService {

    usersChanged = new Subject<User[]>();

    private users: User[] = [

        // new Users(0, 'YrXvgjMVC4etMj3nR1wr7D81FZe2', 'Tony', 'Stark',
        // 'TA Team KZN', 'Jr. TA', '405 (Central Perk)', 0),

        // new Users(1, 'U1qf5cxU7GXroI9jAaxW1o1wjUr2', 'Nick', 'Fury',
        // 'Management Team', 'Director', '400 (Cupola)', 1),

        // new Users(2, 'FNdCPsDjyxbu7R18iJb7nuon9Tw2', 'Peter', 'Parker',
        // 'TA Team KZN', 'Jr. TA', '405 (Central Perk)', 3),

        // new Users(3, 'RtGsY4MFTOWODWtta7SWMFfv6Cr1', 'Maria', 'Hill',
        // 'Management Team', 'HR', '400 (Cupola)', 2),

        // new Users(4, '27WKETG7gnd5F9yuOk0XRPJkrBO2', 'Bruce', 'Banner',
        // 'TA Team KZN', 'Jr. TA', '405 (Central Perk)', 2),

        // new Users(5, 'eFs8ioVt8kO8NexepW5ir0iIa8x1', 'Wanda', 'Maximoff',
        // 'BDA Team 1', 'Sr. BDA', '402', 2),

        // new Users(6, 'rQNoHnO6HNgvyLaTCjEJyfqQFYG3', 'Neena', 'Thurman',
        // 'BDA Team 1', 'BDA', '402', 3),

        // new Users(7, 'WJmmtOmobRgKlB5jMJ8qBpAHRDo2', 'Gamora', 'Zen Whoberi',
        // 'BDA Team 1', 'Jr. BDA', '402', 3),

    ];

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
                    console.log(doc.data());
                    users.push(doc.data());
                    }
                );
                console.log(users);
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
        // console.log(this.getTeams());
        // console.log(this.getRooms());
        // console.log(this.getJobPositions());
        // console.log(this.getUsersByTeam());
        // console.log(this.getUsersByRoom());
        // console.log(this.getUsersByJobPosition());
        return this.users[userId];
    }
    getUsersByTeam() {
        let arr = [];
        const teams = this.getTeams();
        for (let i = 0; i < teams.length; i++) {
            let obj = {
                team: teams[i],
                users: []
            };
            for (let j = 0; j < this.users.length; j++) {
                if (this.users[j].team === teams[i]) {
                    let user = {
                        id: this.users[j].id,
                        name: this.users[j].name,
                        surname: this.users[j].surname,
                        room: this.users[j].room,
                        position: this.users[j].position,
                    };
                    obj.users.push(user);
                }
            }
            arr.push(obj);
        }
        return arr;
    }
    getUsersByRoom() {
        let arr = [];
        const rooms = this.getRooms();
        for (let i = 0; i < rooms.length; i++) {
            let obj = {
                team: rooms[i],
                users: []
            };
            for (let j = 0; j < this.users.length; j++) {
                if (this.users[j].room === rooms[i]) {
                    let user = {
                        id: this.users[j].id,
                        name: this.users[j].name,
                        surname: this.users[j].surname,
                        team: this.users[j].team,
                        position: this.users[j].position,
                    };
                    obj.users.push(user);
                }
            }
            arr.push(obj);
        }
        return arr;
    }
    getUsersByJobPosition() {
        let arr = [];
        const positions = this.getJobPositions();
        for (let i = 0; i < positions.length; i++) {
            let obj = {
                team: positions[i],
                users: []
            };
            for (let j = 0; j < this.users.length; j++) {
                if (this.users[j].position === positions[i]) {
                    let user = {
                        id: this.users[j].id,
                        name: this.users[j].name,
                        surname: this.users[j].surname,
                        room: this.users[j].room,
                        team: this.users[j].team,
                    };
                    obj.users.push(user);
                }
            }
            arr.push(obj);
        }
        return arr;
    }
    getTeams() {
        let teams = [];
        for (let i = 0; i < this.users.length; i++) {
            teams.push(this.users[i].team);
        }
        return this.getUniqueValues(teams);
    }
    getRooms() {
        let rooms = [];
        for (let i = 0; i < this.users.length; i++) {
            rooms.push(this.users[i].room);
        }
        return this.getUniqueValues(rooms);
    }
    getJobPositions() {
        let jobPositions = [];
        for (let i = 0; i < this.users.length; i++) {
            jobPositions.push(this.users[i].position);
        }
        return this.getUniqueValues(jobPositions);
    }
    getUniqueValues(arr: string[]) {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i];
            obj[str] = true; // запомнить строку в виде свойства объекта
          }
          return Object.keys(obj); // или собрать ключи перебором для IE8-
    }

}
