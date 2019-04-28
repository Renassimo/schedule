import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleCommonComponent } from './schedule-common.component';

const scheduleCommonRoutes = [
    {path: '', component: ScheduleCommonComponent},
];

@NgModule({
    imports: [RouterModule.forChild(scheduleCommonRoutes)],
    exports: [RouterModule]
})
export class ScheduleCommonRoutingModule {}
