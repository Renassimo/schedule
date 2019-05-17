import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
    {path: 'schedule', loadChildren: './schedule-common/schedule-common.module#ScheduleCommonModule'},
    {path: 'books', loadChildren: './books/books.module#BooksModule'},
    {path: 'events', loadChildren: './events/events.module#EventsModule'},
    {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
