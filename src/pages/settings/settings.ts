import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth/auth';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    loggedIn: boolean;

    constructor (public navCtrl: NavController, private authService: AuthService) {
        this.loggedIn = false;
    }

    auth(): void {
        this.authService.auth()
            .then(() => {
                this.loggedIn = true;
            })
    }
}