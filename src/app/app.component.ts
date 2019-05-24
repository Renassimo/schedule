import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UsersService } from './shared/users.service';
import { User } from './shared/user.model';
import { Subscription } from 'rxjs';
import { StatusService } from './shared/status.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('onSideNavChange', [
      state('close', style({'min-width': '50px'})),
      state('open', style({'min-width': '170px'})),
      transition('close <=> open',  animate('250ms ease-in')),
    ]),
    trigger('animateText', [
      state('hide', style({'display': 'none', 'opacity': '0'})),
      state('show', style({'display': 'inline', 'opacity': '1'})),
      transition('hide => show',  animate('350ms ease-in')),
      transition('show => hide',  animate('200ms ease-out')),
    ]),
    trigger('onMainContentChange', [
      state('close', style({'margin-left': '56px'})),
      state('open', style({'margin-left': '169px'})),
      state('inactive', style({'margin-left': '0'})),
      transition('close <=> open',  animate('250ms ease-in')),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  public onSideNavChange: boolean;
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  mobileQuery: MediaQueryList;

  title = 'schedule';
  hidden = true;
  uData = {
    active: false,
    id: null,
    uid: null,
    uLevel: 5
  }
  
  private _mobileQueryListener: () => void;
  private subscriptions = new Subscription();


  links = [
      {text: 'Dashboard', link: '/', icon: 'dashboard', level: 0, needAuth: true},
      {text: 'Profile', link: '', icon: 'account_circle', level: 3, needAuth: true},
      {text: 'Schedule', link: '/schedule/team', icon: 'event_note', level: 3, needAuth: true},
      {text: 'Events', link: '/events', icon: 'event_available', level: 0, needAuth: true},
      {text: 'Books', link: '/books', icon: 'book', level: 0, needAuth: true},
      {text: 'Settings', link: '/settings', icon: 'settings', level: 1, needAuth: true},
      {text: 'Log in', link: '/auth/login', icon: 'input', level: 5, needAuth: false}
    ];
    users: User[];
    message;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private usersService: UsersService,
    private statusService: StatusService,
    private snackBar: MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    console.log('App component inited!');
    this.authService.initAuthentication();

    this.subscriptions.add(this.usersService.usersChanged
    .subscribe(
      () => {
        if (this.isAuthenticated) {
          this.uData = this.usersService.getUData(this.authService.uid);
          this.statusService.uData = this.uData;
          this.links[1].link = '/profile/' + this.uData.id;
          console.log('Level:', this.statusService.uData.uLevel);
        }
      }
    ));
    this.subscriptions.add(this.statusService.messageChanged
    .subscribe(
      (message) => {
        this.message = message;
        console.log('Mes in App', this.message);
        this.openSnackBar();
      }
    ));

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptions.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  onSidenavToggle() {
    
    if (this.sideNavState) {
      this.linkText = !this.linkText;
      setTimeout(() => {
        this.sideNavState = this.linkText;
        this.onSideNavChange = this.sideNavState;
      }, 250)
    } else {
      this.sideNavState = !this.sideNavState;
      this.onSideNavChange = this.sideNavState;
      setTimeout(() => {
        this.linkText = this.sideNavState;
      }, 250)
    }

  }
  openSnackBar() {
    if (this.message) {
      this.snackBar.open(this.message, 'Ok', {
        duration: 9000
      });
    }
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  showSpinner() {
    return this.statusService.showSpinner();
  }

}