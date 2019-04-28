import { NgModule } from "@angular/core";
import { ScheduleCommonComponent } from "./schedule-common.component";
import { SchedulePositionComponent } from "./schedule-position/schedule-position.component";
import { ScheduleRoomComponent } from "./schedule-room/schedule-room.component";
import { ScheduleTeamComponent } from "./schedule-team/schedule-team.component";
import {
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule,
    MatNativeDateModule
} from '@angular/material';
import { CommonModule } from "@angular/common";
import { ScheduleCommonRoutingModule } from "./schedule-common-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ScheduleCommonComponent,
        SchedulePositionComponent,
        ScheduleRoomComponent,
        ScheduleTeamComponent
    ],
    imports: [
        CommonModule,
        ScheduleCommonRoutingModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatChipsModule,
        MatListModule,
        MatRadioModule,
        FormsModule,
        MatNativeDateModule
    ],
})
export class ScheduleCommonModule {}