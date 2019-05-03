import { Profile } from "./profile.model";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Subject } from "rxjs";

@Injectable()
export class ProfileService {

    private users = [

        {id: 0, userLevel: 0, name: 'Tony', surname: 'Stark', team: 'TA Team KZN', position: 'Jr. TA',
        room: '405 (Central Perk)', birthday: '19 April', tel: '+7 999 888 77 00',
        email: 'tony.stark@zomzominfo.com', university: 'KSPEU', faculty: 'Industrial Heat Power Engineering',
        grade: 'Master', eduType: 'Graduated', engLevel: 'B1 (Intermediate English)',
        skills: ['HTML', 'CSS', 'JS', 'Angular'], image: '../../../assets/000.jpg'}

        // new Profile(0, 0, 'Tony', 'Stark', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        // '19 April', '+7 999 888 77 00', 'tony.stark@zomzominfo.com',
        // 'KSPEU', 'Industrial Heat Power Engineering', 'Master', 'Graduated',
        // 'B1 (Intermediate English)',
        // ['HTML', 'CSS', 'JS', 'Angular'],
        // '../../../assets/000.jpg'),

        // new Profile(1, 1, 'Nick', 'Fury', 'Management Team', 'Director', '400 (Cupola)',
        // '14 June', '+7 999 888 77 01', 'nick.fury@zomzominfo.com',
        // '', '', 'Specialist', 'Graduated',
        // 'B2 (Upper-Intermediate English)',
        // [],
        // '../../../assets/001.jpg'),

        // new Profile(2, 3, 'Peter', 'Parker', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        // '18 October', '+7 999 888 77 02', 'peter.parker@zomzominfo.com',
        // 'KATK', 'Information Systems', '4th course', 'Full time',
        // 'A2 (Elementary English)',
        // ['HTML', 'CSS', 'JS', 'Python', 'MySQL'],
        // '../../../assets/002.jpg'),

        // new Profile(3, 2, 'Maria', 'Hill', 'Management Team', 'HR', '400 (Cupola)',
        // '31 October', '+7 999 888 77 03', 'maria.hill@zomzominfo.com',
        // '', '', '', 'Graduated',
        // 'B1 (Intermediate English)',
        // [],
        // '../../../assets/003.jpg'),

        // new Profile(4, 2, 'Bruce', 'Banner', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        // '15 February', '+7 999 888 77 04', 'bruce.banner@zomzominfo.com',
        // 'Kazan Federal University', 'Software Engineering', '2nd course Master', 'Part time',
        // 'A2 (Elementary English)',
        // [],
        // '../../../assets/004.jpg'),

        // new Profile(5, 2, 'Wanda', 'Maximoff', 'BDA Team 2', 'Sr. BDA', '402',
        // '30 May', '+7 999 888 77 05', 'wanda.maximoff@zomzominfo.com',
        // 'Kazan Federal University', 'Enviromental management and water engineering', 'Master', 'Graduated',
        // 'B2 (Upper-Intermediate English)',
        // [],
        // '../../../assets/005.jpg'),

        // new Profile(6, 3, 'Neena', 'Thurman', 'BDA Team 2', 'BDA', '402',
        // '3 July', '+7 999 888 77 06', 'neena.thurman@zomzominfo.com',
        // 'Kazan Federal University', '', '3rd course', 'Full Time',
        // 'A2 (Elementary English)',
        // [],
        // '../../../assets/006.jpg'),

        // new Profile(7, 3, 'Gamora', 'Zen Whoberi', 'BDA Team 2', 'Jr. BDA', '402',
        // '23 May', '+7 999 888 77 07', 'gamora.zenwhoberi@zomzominfo.com',
        // 'Kazan State Agrarian University', 'Forestry and ecology faculty', '4th course', 'Full Time',
        // 'A2 (Elementary English)',
        // [],
        // '../../../assets/007.jpg'),

    ];

    private profile: Profile;
    profileChanged = new Subject<Profile>();

    fetchProfile(id) {
        let db = firebase.firestore();
        db.collection('profiles').where('id', '==', id)
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(
                doc => {
                    // console.log('profile:', doc.data());
                    this.setProfile(doc.data());
                }
            );
        });
    }
    setProfile(data) {
        this.profile = data;
        this.profileChanged.next(this.profile);
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
