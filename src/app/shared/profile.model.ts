
import * as moment from 'moment';

export class Profile {

    public id: number;
    public birthday: moment.Moment;
    public tel: string;
    public email: string;
    public university: string;
    public faculty: string;
    public grade: string;
    public eduType: string;
    public engLevel: string;
    public skills: string[];

    constructor(
        id: number,
        birthday: moment.Moment,
        tel: string,
        email: string,
        university: string,
        faculty: string,
        grade: string,
        eduType: string,
        engLevel: string,
        skills: string[],
        ) {
            this.id = id;
            this.birthday = birthday;
            this.tel = tel;
            this.email = email;
            this.university = university;
            this.faculty = faculty;
            this.grade = grade;
            this.eduType = eduType;
            this.engLevel = engLevel;
            this.skills = skills;
        }

}
