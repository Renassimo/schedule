import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile } from 'src/app/shared/profile.model';
import { ProfileService } from 'src/app/shared/profile.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  id: number;
  user;
  profile: Profile;
  usersSubscription: Subscription;
  profileSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    ) { }

  ngOnInit() {

    this.profileSubscription = this.profileService.profileChanged.subscribe(
      (profile: Profile) => {
        this.profile = profile;
        console.log('proof:', this.profile);
      }
    );

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.profileService.fetchProfile(this.id);
      }
    );


    this.user = this.profileService.getUser(this.id);
    // console.log(this.user);
  }
  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

}
