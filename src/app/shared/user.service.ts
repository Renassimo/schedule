import { User } from "./user.model";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    private users: User[] = [

        new User(0, 0, 'Renas', 'Sitdikov', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        '19 April', '+7 917 265 72 16', 'renas.sitdikov@zoominfo.com',
        'KSPEU', 'Industrial Heat Power Engineering', 'Master', 'Graduated',
        'B1 (Intermediate English)',
        ['HTML', 'CSS', 'JS', 'Angular'],
        '../../../assets/000.jpg'),

        new User(1, 1, 'Rustam', 'Akhmadullin', 'Management Team', 'Director', '400 (Cupola)',
        '14 June', '+7 905 038 25 90', 'rustam.akhmadullin@zoominfo.com',
        '', '', 'Specialist', 'Graduated',
        'B2 (Upper-Intermediate English)',
        [],
        '../../../assets/001.jpg'),

        new User(2, 3, 'Abuzyar', 'Tazetdinov', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        '18 October', '+7 939 337 27 26', 'abuzyar.tazetdinov@zoominfo.com',
        'KATK', 'Information Systems', '4th course', 'Full time',
        'A2 (Elementary English)',
        ['HTML', 'CSS', 'JS', 'Python', 'MySQL'],
        '../../../assets/002.jpg'),

        new User(3, 2, 'Anastasia', 'Titarenko', 'Management Team', 'HR', '400 (Cupola)',
        '31 October', '+7 987 069 82 39', 'anastasia.titarenko@zoominfo.com',
        '', '', '', 'Graduated',
        'B1 (Intermediate English)',
        [],
        '../../../assets/003.jpg'),

        new User(4, 2, 'Nikita', 'Rusin', 'TA Team KZN', 'Jr. TA', '405 (Central Perk)',
        '15 February', '+7 937 770 04 48', 'nikita.rusin@zoominfo.com',
        'Kazan Federal University', 'Software Engineering', '2nd course Master', 'Part time',
        'A2 (Elementary English)',
        [],
        '../../../assets/004.jpg'),

        new User(5, 2, 'Alexandra', 'Lipova', 'BDA Team 2', 'Sr. BDA', '402',
        '30 May', '+7 917 246 58 66', 'alexandra.lipova@zoominfo.com',
        'Kazan Federal University', 'Enviromental management and water engineering', 'Master', 'Graduated',
        'B2 (Upper-Intermediate English)',
        [],
        '../../../assets/005.jpg'),

        new User(6, 3, 'Regina', 'Mardanshina', 'BDA Team 2', 'BDA', '402',
        '3 July', '+7 937 574 79 16', 'Regina.Mardanshina@zoominfo.com',
        'Kazan Federal University', '', '3rd course', 'Full Time',
        'A2 (Elementary English)',
        [],
        '../../../assets/006.jpg'),

        new User(7, 3, 'Diana', 'Sabirzanova', 'BDA Team 2', 'Jr. BDA', '402',
        '23 May', '+7 950 321 47 63', 'diana.sabirzanova@zoominfo.com',
        'Kazan State Agrarian University', 'Forestry and ecology faculty', '4th course', 'Full Time',
        'A2 (Elementary English)',
        [],
        '../../../assets/007.jpg'),

    ];

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
