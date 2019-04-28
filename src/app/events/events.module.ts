import { NgModule } from '@angular/core';
import { EventEditComponent } from './event-edit/event-edit.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { SuggestedEventsComponent } from './suggested-events/suggested-events.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { EventsComponent } from './events.component';
import {
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule
} from '@angular/material';
import { EventsRoutingModule } from './events-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EventEditComponent,
        PastEventsComponent,
        SuggestedEventsComponent,
        UpcomingEventsComponent,
        EventsComponent
    ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        MatPaginatorModule
    ]
})
export class EventsModule {}
