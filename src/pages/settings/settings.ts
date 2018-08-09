import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth/auth';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    loggedIn: boolean;
    spotifyId: string;

    constructor (public navCtrl: NavController, private authService: AuthService) {
        this.loggedIn = false;
    }

    auth(): void {
        this.authService.auth()
            .then(() => {
                this.loggedIn = true;
                this.spotifyId = this.authService.spotifyId;
            })
    }
}