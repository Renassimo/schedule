import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'schedule';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('App component inited!');
    this.authService.initAuthentication();
  }
}
