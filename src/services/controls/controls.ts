import { Injectable } from '@angular/core'
import { API_ENDPOINT } from '../../app/app.config'

import { AuthService } from '../auth/auth'
import { HTTP } from '@ionic-native/http'

import { CurrentSong } from '../../models/currentsong'

import _ from 'lodash'

@Injectable()
export class ControlsService {
  constructor (private auth: AuthService, private http: HTTP) {
    this.currentSong = new CurrentSong()
    this.http.setDataSerializer('json')
  }

  currentSong: CurrentSong

  private getHeaders (): object {
    return {
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': 'application/json'
    }
  }

  private performRequest (endpoint, method, parameters): Promise<any> {
    return new Promise((resolve, reject) => {
      switch (method) {
        case 'GET':
          this.http.get(`${API_ENDPOINT}${endpoint}`, parameters, this.getHeaders())
            .then(data => {
              resolve(JSON.parse(data.data))
            })
            .catch(err => {
              reject(err)
            })
          break

        case 'PUT':
          this.http.put(`${API_ENDPOINT}${endpoint}`, parameters, this.getHeaders())
            .then(data => {
              resolve(JSON.parse(data.data))
            })
            .catch(err => {
              reject(err)
            })
          break

        case 'POST':
          this.http.post(`${API_ENDPOINT}${endpoint}`, parameters, this.getHeaders())
            .then(data => {
              resolve(JSON.parse(data.data))
            })
            .catch(err => {
              reject(err)
            })
          break

      }
    })
  }

  public play (): Promise<any> {
    return this.performRequest('/me/player/play', 'PUT', {})
  }

  public pause (): Promise<any> {
    return this.performRequest('/me/player/pause', 'PUT', {})
  }

  public next (): void {
    this.performRequest('/me/player/next', 'POST', {})
  }

  public prev (): void {
    this.performRequest('/me/player/previous', 'POST', {})
  }

  public search (q: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.performRequest('/search', 'GET', { q: q, type: 'album,artist,playlist,track', limit: '10' })
        .then(res => {
          resolve(res)
        })
        .catch(reject)
    })
  }

  public playSong (uri: string): void {
    this.performRequest('/me/player/play', 'PUT', { uris: [uri] })
      .catch(err => {
        console.log(err)
      })
  }

  public updatePlaying (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.performRequest('/me/player/currently-playing', 'GET', {})
        .then(res => {
          this.currentSong.song = res.item.name
          this.currentSong.artwork = res.item.album.images[0].url
          this.currentSong.artists = _.map(res.item.artists, x => x.name)
          this.currentSong.album = res.item.album.name
          this.currentSong.playing = res.is_playing

          resolve()
        })
        .catch(reject)
    })
  }
}
