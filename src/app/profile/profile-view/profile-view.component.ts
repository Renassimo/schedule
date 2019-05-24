import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from 'src/app/shared/profile.model';
import { ProfileService } from 'src/app/shared/profile.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusService } from 'src/app/shared/status.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass'],
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  id: number;
  user: User;
  profile: Profile;
  private subscriptions = new Subscription();
  idFromParams = false;
  avatar = null;
  uid = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private usersService: UsersService,
    private statusService: StatusService
    ) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        if (params['id']) {
          this.idFromParams = true;
          this.id = +params['id'];
        } else {
          this.idFromParams = false;
          this.setId();
        }
        this.setProfile();
      }
    );
    this.subscriptions.add(
      this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.setId();
        this.user = users[this.id];
        this.uid = this.user.uid;
        this.setAvatar();
      }
    ));
    this.subscriptions.add(this.usersService.avatarChanged.subscribe(
      (avatar) => {
        this.avatar = avatar;
      }
    ));
    this.subscriptions.add(this.profileService.profileChanged.subscribe(
      (profile: Profile) => {
        this.profile = profile;
      }
    ));
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  setProfile() {
    if (this.isAuthenticated) {
      this.profileService.fetchProfile(this.id);
      this.user = this.usersService.getUser(this.id);
      if (this.user) {
        this.uid = this.user.uid;
      }
      this.setAvatar();
    } else {
      this.profile = null;
      this.user = null;
      this.uid = null;
      this.avatar = null;
    }
  }
  setId() {
    if (this.isAuthenticated && !this.idFromParams) {
      this.id = this.statusService.getId();
      this.setProfile();
    }
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  uId() {
    return this.statusService.getId();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  setAvatar() {
    if (this.uid) {
      console.log('UID:', this.uid);
      this.usersService.downloadAvatar(this.uid);
    }
  }

}
