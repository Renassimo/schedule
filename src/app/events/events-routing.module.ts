import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';

const eventsRoutes = [
    {path: '', component: EventsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(eventsRoutes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {}
