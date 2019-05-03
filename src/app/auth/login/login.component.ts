import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StatusService } from 'src/app/shared/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private statusService: StatusService
    ) { }


  ngOnInit() {
    this.initForm();
    // this.statusService.outside();
    // this.titleService.setTitle('My Flights - log in');
  }
  ngOnDestroy() {
    // this.statusService.clearMessages();
  }

  onSignin() {
    // this.statusService.clearMessages();
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    console.log('Email: ' + email + '; Password: ' + password);
    // this.statusService.clearMessages();
    this.authService.signinUser(email, password);
  }

  private initForm() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  isAuthenticated() {
    return this.statusService.isAuthenticated();
  }
  isRedirecting() {
    return this.statusService.isRedirecting();
  }

}
