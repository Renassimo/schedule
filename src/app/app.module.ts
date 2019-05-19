import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import { ProfileService } from './shared/profile.service';
import { ScheduleService } from './shared/schedule.service';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/users.service';
import { AuthService } from './auth/auth.service';
import { StatusService } from './shared/status.service';
import { SettingsService } from './settings/settings.service';
import { MatSidenavModule, MatListModule, MatButtonModule, MatTooltipModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [ProfileService, UsersService, ScheduleService, AuthService, StatusService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
