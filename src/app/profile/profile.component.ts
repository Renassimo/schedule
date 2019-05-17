import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  // userId: number;
  // user: Profile;

  constructor(private route: ActivatedRoute,
    private profileService: ProfileService,
    private statusService: StatusService
    ) { }

  ngOnInit() {
    // this.userId = this.route.snapshot.params['id'];
    // this.user = this.profileService.getUser(this.userId);
    // console.log(this.user);
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
