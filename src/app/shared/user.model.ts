export class User {

    public id: number;
    public userLevel: number;
    public name: string;
    public surname: string;
    public team: string;
    public position: string;
    public room: string;
    public birthday: string;
    public tel: string;
    public email: string;
    public university: string;
    public faculty: string;
    public grade: string;
    public eduType: string;
    public engLevel: string;
    public skills: string[];
    public image: string;

    constructor(
        id: number,
        userLevel: number,
        name: string,
        surname: string,
        team: string,
        position: string,
        room: string,
        birthday: string,
        tel: string,
        email: string,
        university: string,
        faculty: string,
        grade: string,
        eduType: string,
        engLevel: string,
        skills: string[],
        image: string,
        ) {
            this.id = id;
            this.userLevel = userLevel;
            this.name = name;
            this.surname = surname;
            this.team = team;
            this.position = position;
            this.room = room;
            this.birthday = birthday;
            this.tel = tel;
            this.email = email;
            this.university = university;
            this.faculty = faculty;
            this.grade = grade;
            this.eduType = eduType;
            this.engLevel = engLevel;
            this.skills = skills;
            this.image = image;
        }

}
