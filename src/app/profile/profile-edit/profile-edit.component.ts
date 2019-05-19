import { Component, OnInit, OnDestroy } from '@angular/core';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/profile.service';
import { UsersService } from 'src/app/shared/users.service';
import { StatusService } from 'src/app/shared/status.service';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Profile } from 'src/app/shared/profile.model';
import { SettingsService } from 'src/app/settings/settings.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.sass'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  startDate = new Date(1998, 0, 1);

  id: number;
  user: User;
  profile: Profile;
  usersSubscription: Subscription;
  profileSubscription: Subscription;
  settingsSubscription: Subscription;
  profileForm: FormGroup;
  sets = {};

  chips = {
    visible: true,
    selectable: true,
    removable: true,
    addOnBlur: true,
  }
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private usersService: UsersService,
    private statusService: StatusService,
    private settingsService: SettingsService,
    ) {}

  ngOnInit() {
    this.statusService.inside();

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.setProfile();
      }
    );
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.user = users[this.id];
      }
    );
    this.profileSubscription = this.profileService.profileChanged.subscribe(
      (profile: Profile) => {
        this.profile = profile;
      this.initForm();
      }
    );
    this.settingsSubscription = this.settingsService.settingsChanged.subscribe(
      (settings) => {
        this.sets = settings;
      }
    );
    this.setProfile();
    this.detectSetting();
    
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }

  setProfile() {
    if (this.isAuthenticated) {
      this.profileService.fetchProfile(this.id);
      this.user = this.usersService.getUser(this.id);
    } else {
      this.profile = null;
      this.user = null;
      this.skills = [];
    }
  }
  onSubmit() {
    this.statusService.spin();
    this.profileForm.value.skills = this.skills;
    this.profileForm.value.id = this.id;
    this.profileForm.value.birthday = this.profileForm.value.birthday.format();
    console.log(this.profileForm.value);
    this.profileService.updateProfile(this.user.uid, this.profileForm.value, '/profile/' + this.id);
  }
  onCancel() {
    this.router.navigate(['/profile/' + this.id]);
  }
  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      this.usersService.uploadAvatar(event, this.user.uid);
    }
  }
  detectSetting() {
    if (this.isAuthenticated()) {
      this.sets = this.settingsService.settings;
    } else {
      this.sets = {};
    }
  }

  private initForm() {
    let birthday: moment.Moment;
    let email = '';
    let faculty = '';
    let tel = '';
    let university = '';
    let grade = '';
    let eduType = '';
    let engLevel = '';

    this.skills = [];

    if (this.isAuthenticated()) {
      const profile = this.profile;

      birthday = profile.birthday;
      email = profile.email;
      faculty = profile.faculty;
      tel = profile.tel;
      university = profile.university;
      grade = profile.grade;
      eduType = profile.eduType;
      engLevel = profile.engLevel;

      this.skills = profile.skills;
    }

    this.profileForm = new FormGroup({
      'birthday': new FormControl(birthday, Validators.required),
      'email': new FormControl(email, Validators.required),
      'faculty': new FormControl(faculty),
      'tel': new FormControl(tel),
      'university': new FormControl(university),
      'grade': new FormControl(grade),
      'eduType': new FormControl(eduType),
      'engLevel': new FormControl(engLevel),
    });
  }
  onClearInput(name, required = false) {
    if (required) {
      this.profileForm.setControl(name, new FormControl('', Validators.required));
    } else {
      this.profileForm.setControl(name, new FormControl(''));
    }
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  uId() {
    return this.statusService.getId();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

}
