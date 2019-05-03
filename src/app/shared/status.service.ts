import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class StatusService {
    errorMessage: string;
    successMessage: string;
    spinner = false;
    insideComponent = false;
    authenticated = false;
    redirection = false;

    constructor(private router: Router) {}

    setErrorMessage(message: string) {
        this.errorMessage = message;
    }
    setSuccessMessage(message: string) {
        this.successMessage = message;
    }
    clearMessages() {
        this.errorMessage = '';
        this.successMessage = '';
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    getSuccessMessage() {
        return this.successMessage;
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
            // this.router.navigate(['']);
        }
    }
    protectOutside() {
        this.authenticated = true;
        this.redirection = false;
        if (!this.insideComponent) {
            console.log('Redirecting the outside component');
            // this.router.navigate(['']);
        }
    }

}
