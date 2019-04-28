export class DateContent {
    constructor (
        public id: number,
        public timeIn: string,
        public timeOut: string,
        public breakDuration: string,
        public duration: number,
        public dayType: string,
        public workDay: boolean,
        public comment: string,
        ) {}
}
