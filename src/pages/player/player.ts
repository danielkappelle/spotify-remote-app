import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ControlsService } from '../../services/controls/controls';

@Component({
    selector: 'page-player',
    templateUrl: 'player.html'
})

export class PlayerPage {
    constructor (public navCtrl: NavController, private controls: ControlsService) { }

    play(): void {
        this.controls.play();
    }

    pause():  void {
        this.controls.pause();
    }
}