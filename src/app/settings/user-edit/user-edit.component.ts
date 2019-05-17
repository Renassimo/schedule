import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusService } from 'src/app/shared/status.service';
import { SettingsService } from '../settings.service';
import { ProfileService } from 'src/app/shared/profile.service';
import { Profile } from 'src/app/shared/profile.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit, OnDestroy {

  sets = {};
  uLevels = [];

  editMode = false;
  usersSubscription: Subscription;
  settingsSubscription: Subscription;
  userForm: FormGroup;
  id: number;
  profileBlank = {
    birthday: '',
    eduType: '',
    email: '',
    engLevel: '',
    faculty: '',
    grade: '',
    id: 99999,
    image: '',
    skills: [],
    tel: '',
    university: ''
  };

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private settingsService: SettingsService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {

    this.usersSubscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.initForm();
      }
    );
    this.settingsSubscription = this.settingsService.settingsChanged.subscribe(
      (settings) => {
        this.sets = settings;
        // this.detectSetting();
      }
    );
    this.detectSetting();
    this.uLevels = this.settingsService.uLevels;

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // console.log('edit mode:', this.editMode);
        // console.log(params['id']);
        this.initForm();
      }
    );
    // console.log('Flight Edit component inited!');
    // console.log(this.userForm);

  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }


  onClearInput(name, required = false) {
    if (required) {
      this.userForm.setControl(name, new FormControl('', Validators.required));
    } else {
      this.userForm.setControl(name, new FormControl(''));
    }
  }


  onSubmit() {

    if (this.editMode) {

      const uid = this.usersService.getUser(this.id).uid;
      this.userForm.value.id = this.id;
      this.userForm.value.uid = uid;
      console.log('Update:', this.userForm.value);

    } else {

      const id = this.usersService.getUsersLength();
      this.userForm.value.id = id;
      this.profileBlank.id = id;

      const uid = this.userForm.value.uid;

      console.log('Add:', this.userForm.value);
      console.log('Add profile:', this.profileBlank);
      this.profileService.updateProfile(uid, this.profileBlank, '/settings/users');

    }
    this.usersService.updateUser(this.userForm.value.uid, this.userForm.value);
  }
  onCancel() {
    this.router.navigate(['/settings/users']);
  }
  detectSetting() {
    if (this.isAuthenticated()) {
      this.sets = this.settingsService.settings;
    } else {
      this.sets = {};
    }
  }


  private initForm() {
    let active = false;
    let name = '';
    let position = '';
    let room = '';
    let surname = '';
    let team = '';
    let uLevel = 3;
    let uid = '';

    if (this.editMode && this.isAuthenticated()) {
    // if (this.editMode) {
      const user = this.usersService.getUser(this.id);

      active = user.active;
      name = user.name;
      position = user.position;
      room = user.room;
      surname = user.surname;
      team = user.team;
      uLevel = user.uLevel;
      uid = user.uid;

    }

    this.userForm = new FormGroup({
      'active': new FormControl(active),
      'name': new FormControl(name, Validators.required),
      'position': new FormControl(position, Validators.required),
      'room': new FormControl(room, Validators.required),
      'surname': new FormControl(surname, Validators.required),
      'team': new FormControl(team, Validators.required),
      'uLevel': new FormControl(uLevel, Validators.required),
      'uid': new FormControl({value: uid, disabled: this.editMode}, Validators.required),
    });
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
