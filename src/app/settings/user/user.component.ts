import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { User } from 'src/app/shared/user.model';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';
import { StatusService } from 'src/app/shared/status.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'team', 'position', 'level'];
  dataSource: MatTableDataSource<User>;
  private subscriptions = new Subscription();
  dataLength;
  uLevels = [];
  users: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersService: UsersService,
    private settingsService: SettingsService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.statusService.inside();

    this.subscriptions.add(this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.paginator = this.paginator;
        this.dataLength = this.dataSource.filteredData.length;
      }
    ));


    this.uLevels = this.settingsService.uLevels;
    this.users = this.usersService.getUsers();
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataLength = this.dataSource.filteredData.length;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  uLevel() {
    return this.statusService.getULevel();
  }
  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }

}
