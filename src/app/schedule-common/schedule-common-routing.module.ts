import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleCommonComponent } from './schedule-common.component';

const scheduleCommonRoutes = [
    {path: '', component: ScheduleCommonComponent},
    {path: ':type', component: ScheduleCommonComponent},
    {path: ':type/:year/:week', component: ScheduleCommonComponent},
];

@NgModule({
    imports: [RouterModule.forChild(scheduleCommonRoutes)],
    exports: [RouterModule]
})
export class ScheduleCommonRoutingModule {}
