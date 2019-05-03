import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusService } from 'src/app/shared/status.service';
import { SettingsService } from '../settings.service';

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

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private settingsService: SettingsService,
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
        console.log('edit mode:', this.editMode);
        console.log(params['id']);
        this.initForm();
      }
    );
    console.log('Flight Edit component inited!');
    console.log(this.userForm);

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
    // this.statusService.spin();
    // const age = this.countAge(this.flightForm.value.date, this.flightForm.value.ff);
    // this.flightForm.value.age = age;
    // this.userForm.value.active = this.active;

    if (this.editMode) {
      this.userForm.value.id = this.id;
      console.log('Update:', this.userForm.value);
      this.userForm.value.uid = this.usersService.getUser(this.id).uid;
      // this.flightsService.updateFlight(
      //   this.id,
      //   this.flightForm.value,
      //   this.authService.getToken(),
      //   this.authService.getUID()
      //   );
    } else {
      this.userForm.value.id = this.usersService.getUsersLength();
      console.log('Add:', this.userForm.value);
      // this.flightForm.value.n = 0;
      // this.flightsService.addFlight(
      //   this.flightForm.value,
      //   this.id,
      //   this.authService.getToken(),
      //   this.authService.getUID()
      //   );
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
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
