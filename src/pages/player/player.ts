import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

import { ControlsService } from '../../services/controls/controls'
import { CurrentSong } from '../../models/currentsong'

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})

export class PlayerPage {
  constructor (public navCtrl: NavController, public controls: ControlsService) {
    this.currentSong = new CurrentSong()
    setInterval(() => { this.update() }, 1000)
  }

  currentSong: CurrentSong

  playpause (): void {
    let prom
    prom = this.currentSong.playing ? this.controls.pause() : this.controls.play()
    this.currentSong.playing = !this.currentSong.playing
  }

  next (): void {
    this.controls.next()
  }

  prev (): void {
    this.controls.prev()
  }

  update (): void {
    this.controls.updatePlaying()
      .then(() => {
        this.currentSong = this.controls.currentSong
        console.log(this.currentSong)
      })
  }
}
