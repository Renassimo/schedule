import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'team', 'position', 'level'];
  dataSource: MatTableDataSource<User>;
  subscription: Subscription;
  dataLength;
  uLevels = [];
  users: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersService: UsersService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {

    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.paginator = this.paginator;
        this.dataLength = this.dataSource.filteredData.length;
      }
    );


    this.uLevels = this.settingsService.uLevels;
    this.users = this.usersService.getUsers();
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataLength = this.dataSource.filteredData.length;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
