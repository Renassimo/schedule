import { DateContent } from "./date-content.model";


export class Schedule {
    public date: Date;
    public dateContent: DateContent[];

    constructor(
        date: Date,
        dateContent: DateContent[]
    ) {
        this.date = date;
        this.dateContent = dateContent;
    }
}
