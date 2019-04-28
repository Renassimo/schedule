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
    MatListModule
} from '@angular/material';
import { SettingsRoutingModule } from "./settings-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SettingsComponent
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
    ]
})
export class SettingsModule {}