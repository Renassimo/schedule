import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { CommonModule } from "@angular/common";
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
    MatSlideToggleModule
} from '@angular/material';
import { SettingsRoutingModule } from "./settings-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { WeekComponent } from './week/week.component';
import { WeekEditComponent } from './week/week-edit/week-edit.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

@NgModule({
    declarations: [
        SettingsComponent,
        UserEditComponent,
        UserComponent,
        SettingsEditComponent,
        WeekComponent,
        WeekEditComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
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
        MatSlideToggleModule,
        DragDropModule,
        NgxMaterialTimepickerModule
    ]
})
export class SettingsModule {}