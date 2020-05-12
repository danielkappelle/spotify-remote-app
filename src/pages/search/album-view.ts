import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { ControlsService } from '../../services/controls/controls'

@Component({
  selector: 'page-album-view',
  templateUrl: 'album-view.html'
})
export class AlbumViewPage {
  constructor (public NavCtrl: NavController, public navParams: NavParams, public controls: ControlsService) {
    this.loadReady = false
    this.album = navParams.get('album')
    this.controls.getAlbum(this.album.id)
      .then(res => {
        this.album = res
        this.loadReady = true
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadReady: boolean
  albumId: string
  album: any

  playSong (song: any): void {
    this.controls.playSong(song.uri)
  }

}
