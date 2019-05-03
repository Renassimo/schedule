import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user/user.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';

const settingsRoutes = [
    {path: '', component: SettingsComponent},
    {path: 'users', component: UserComponent},
    {path: 'user-edit/new', component: UserEditComponent},
    {path: 'user-edit/:id', component: UserEditComponent},
    {path: 'edit/:setting', component: SettingsEditComponent},
];

@NgModule({
    imports: [RouterModule.forChild(settingsRoutes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
