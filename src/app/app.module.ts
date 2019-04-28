import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatMomentDateModule} from '@angular/material-moment-adapter';

import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleEditComponent } from './schedule/schedule-edit/schedule-edit.component';
import { ScheduleViewComponent } from './schedule/schedule-view/schedule-view.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ImageDownloadOptionsSheetComponent } from './profile/profile-edit/profile-edit.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleCommonComponent } from './schedule-common/schedule-common.component';
import { ScheduleRoomComponent } from './schedule-common/schedule-room/schedule-room.component';
import { ScheduleTeamComponent } from './schedule-common/schedule-team/schedule-team.component';
import { SchedulePositionComponent } from './schedule-common/schedule-position/schedule-position.component';
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { EventsComponent } from './events/events.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { UpcomingEventsComponent } from './events/upcoming-events/upcoming-events.component';
import { PastEventsComponent } from './events/past-events/past-events.component';
import { SuggestedEventsComponent } from './events/suggested-events/suggested-events.component';
import { SettingsComponent } from './settings/settings.component';

import { UserService } from './shared/user.service';
import { ScheduleService } from './shared/schedule.service';

const appRoutes: Routes = [
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'schedule', component: ScheduleCommonComponent},
  {path: 'books', component: BooksComponent},
  {path: 'events', component: EventsComponent},
  {path: 'settings', component: SettingsComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    ScheduleComponent,
    ScheduleEditComponent,
    ScheduleViewComponent,
    ProfileViewComponent,
    ProfileEditComponent,
    ImageDownloadOptionsSheetComponent,
    ScheduleCommonComponent,
    ScheduleRoomComponent,
    ScheduleTeamComponent,
    SchedulePositionComponent,
    BooksComponent,
    BookEditComponent,
    EventsComponent,
    EventEditComponent,
    UpcomingEventsComponent,
    PastEventsComponent,
    SuggestedEventsComponent,
    SettingsComponent
  ],
  entryComponents: [
    // ProfileEditComponent,
    ImageDownloadOptionsSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatChipsModule,
    MatTableModule,
    MatRadioModule,
    // MatButtonToggleModule,
    // MatMomentDateModule
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [UserService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
