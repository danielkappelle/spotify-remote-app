import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class AuthService {
    constructor (private iab: InAppBrowser, private http: HTTP) {}

    accessToken: string;
    spotifyId: string;

    getSpotifyId(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http.get('https://api.spotify.com/v1/me', {}, {'Authorization': `Bearer ${this.accessToken}`})
            .then(data => {
                let json = JSON.parse(data.data);
                this.spotifyId = json.display_name;
                console.log(data);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject();
            })
        })
    }

    auth(): Promise<void> {
        console.log('in auth func');

        const apiBaseUrl = 'https://accounts.spotify.com';
        const client_id = '03ddb7b54d5f4714943e4bbac0ea3d96';
        const response_type = 'token';
        const redirect_uri = 'http://192.168.2.13/callback';
        const scopes = [
            'playlist-read-collaborative',
            'playlist-modify-public',
            'playlist-read-private',
            'playlist-modify-private',
            'user-read-currently-playing',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-library-read',
            'user-library-modify',
            'app-remote-control',
            'user-top-read',
            'user-read-recently-played'
        ];

        const scope = scopes.join(' ');

        const browser = this.iab.create(`${apiBaseUrl}/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&show_dialog=true`, '_self', 'location=no');

        return new Promise ((resolve, reject) => {
            browser.on('loadstart').subscribe(event => {
                console.log(event);
                if(event.url.indexOf(redirect_uri) === 0) {
                    browser.close();
                    
                    this.accessToken = event.url.match(/[#&]access_token=([^&]*)/)[1];
                    this.getSpotifyId()
                        .then(resolve)
                        .catch(reject);
                }
            })
        })
    }
}