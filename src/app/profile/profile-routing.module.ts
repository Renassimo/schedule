import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const profileRoutes = [
    {path: 'edit/:id', component: ProfileEditComponent},
    {path: ':id', component: ProfileComponent},
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
