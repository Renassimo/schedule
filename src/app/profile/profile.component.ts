import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userId: number;
  user: User;

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.user = this.userService.getUser(this.userId);
    // console.log(this.user);
  }

}
