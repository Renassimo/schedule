export class User {

    public id: number;
    public uid: string;
    public name: string;
    public surname: string;
    public team: string;
    public position: string;
    public room: string;
    public uLevel: number;
    public active: boolean;

    constructor(
        id: number,
        uid: string,
        name: string,
        surname: string,
        team: string,
        position: string,
        room: string,
        uLevel: number,
        active: boolean
        ) {
            this.id = id;
            this.uid = uid;
            this.name = name;
            this.surname = surname;
            this.team = team;
            this.position = position;
            this.room = room;
            this.uLevel = uLevel;
            this.active = active;
        }

}
