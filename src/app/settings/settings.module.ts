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

@NgModule({
    declarations: [
        SettingsComponent,
        UserEditComponent,
        UserComponent,
        SettingsEditComponent,
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
        DragDropModule
    ]
})
export class SettingsModule {}