import { NgModule } from "@angular/core";
import { ScheduleCommonComponent } from "./schedule-common.component";
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
    MatNativeDateModule,
    MatBadgeModule
} from '@angular/material';
import { CommonModule } from "@angular/common";
import { ScheduleCommonRoutingModule } from "./schedule-common-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ScheduleCommonComponent
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
        MatNativeDateModule,
        MatBadgeModule
    ],
})
export class ScheduleCommonModule {}