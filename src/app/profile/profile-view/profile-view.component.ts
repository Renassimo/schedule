import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from 'src/app/shared/profile.model';
import { ProfileService } from 'src/app/shared/profile.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusService } from 'src/app/shared/status.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import * as moment from 'moment';
// import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass'],
  // viewProviders: [MatExpansionPanel] // <----- Here
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  id: number;
  user: User;
  profile: Profile;
  usersSubscription: Subscription;
  profileSubscription: Subscription;

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
        this.id = +params['id'];
        // this.profileService.fetchProfile(this.id);
        this.setProfile();
      }
    );
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.user = users[this.id];
        // console.log('User:', this.user);
      }
    );
    this.profileSubscription = this.profileService.profileChanged.subscribe(
      (profile: Profile) => {
        this.profile = profile;
        // console.log('proof:', this.profile);
      // console.log('Profile:', this.profile);
      }
    );


    // this.setProfile();
    // this.user = this.profileService.getUser(this.id);
    // console.log(this.user);
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }
  setProfile() {
    if (this.isAuthenticated) {
      this.profileService.fetchProfile(this.id);
      this.user = this.usersService.getUser(this.id);
      // console.log('Profile:', this.profile);
      // console.log('User:', this.user);
    } else {
      this.profile = null;
      this.user = null;
    }
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
