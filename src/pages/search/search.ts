import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { ControlsService } from '../../services/controls/controls'

import _ from 'lodash'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  constructor (public navCtrl: NavController, private controls: ControlsService) {
    this.searchReady = false
    this.type = 'songs'
  }

  searchResults: any
  searchReady: boolean
  type: string

  getItems (event): void {
    this.controls.search(event.target.value)
      .then(res => {
        this.searchResults = res
        this.searchReady = true
        console.log(this.searchResults)
      })
  }

  parseArtist (artists: Array<any>): void {
    return _.map(artists, x => x.name).join(', ')
  }

  playSong (song: any): void {
    this.controls.playSong(song.uri)
  }
}
