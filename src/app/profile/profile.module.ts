import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ScheduleComponent } from "../schedule/schedule.component";
import { ScheduleViewComponent } from "../schedule/schedule-view/schedule-view.component";
import { ScheduleEditComponent } from "../schedule/schedule-edit/schedule-edit.component";
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
    MatNativeDateModule
} from '@angular/material';
import { CommonModule } from "@angular/common";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileViewComponent,
        ProfileEditComponent,
        ScheduleComponent,
        ScheduleViewComponent,
        ScheduleEditComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
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
        MatNativeDateModule
    ]
})
export class ProfileModule {}
