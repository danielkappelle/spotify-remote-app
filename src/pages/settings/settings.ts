import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

import { AuthService } from '../../services/auth/auth'
import { User } from '../../models/user'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  loggedIn: boolean
  user: User

  constructor (public navCtrl: NavController, private authService: AuthService) {
    this.loggedIn = false
  }

  auth (): void {
    this.authService.auth()
      .then(() => {
        this.loggedIn = true
        this.user = this.authService.user
        console.log(this.user)
      })
  }
}
