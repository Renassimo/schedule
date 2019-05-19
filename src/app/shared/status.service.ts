import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class StatusService {
    spinner = false;
    insideComponent = false;
    authenticated = false;
    redirection = false;
    uData = {
      active: false,
      id: null,
      uid: null,
      uLevel: 5
    }
    messageChanged = new Subject<string>();

    constructor(private router: Router) {}

    detectError(error) {
        this.stopSpin();
        console.log(error);
        console.log(error.code);
        console.log(error.message);
        this.setMessage(error.message);
    }
    setMessage(message: string) {
        this.messageChanged.next(message);
    }
    spin() {
        this.spinner = true;
    }
    stopSpin() {
        this.spinner = false;
    }
    isSpinning() {
        return this.spinner;
    }
    showSpinner() {
      return (!this.isAuthenticated() && !this.isRedirecting()) || this.isSpinning();
    }
    isAuthenticated() {
        return this.authenticated;
    }
    isRedirecting() {
        return this.redirection;
    }
    inside() {
        this.insideComponent = true;
    }
    outside() {
        this.insideComponent = false;
    }
    protectInside() {
        this.authenticated = false;
        this.redirection = true;
        if (this.insideComponent) {
            console.log('Redirecting the inside component');
            this.router.navigate(['/auth/login']);
        }
    }
    protectOutside() {
        this.authenticated = true;
        this.redirection = false;
        this.uData.uLevel = 5;
        if (!this.insideComponent) {
            console.log('Redirecting the outside component');
            this.router.navigate(['/profile']);
        }
    }
    getId() {
        return this.uData.id;
    }
    getULevel() {
        return this.uData.uLevel;
    }

}
