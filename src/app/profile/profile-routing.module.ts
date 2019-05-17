import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ScheduleViewComponent } from '../schedule/schedule-view/schedule-view.component';
import { ScheduleEditComponent } from '../schedule/schedule-edit/schedule-edit.component';

const profileRoutes = [
    {path: 'edit/:id', component: ProfileEditComponent},
    {path: '', component: ProfileComponent, children: [
        {path: '', component: ScheduleViewComponent},
        {path: 'edit', component: ScheduleEditComponent}
    ]},
    {path: ':id', component: ProfileComponent, children: [
        {path: '', component: ScheduleViewComponent},
        {path: 'edit', component: ScheduleEditComponent}
    ]},
    {path: ':id/:year/:week', component: ProfileComponent, children: [
        {path: '', component: ScheduleViewComponent},
        {path: 'edit', component: ScheduleEditComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
