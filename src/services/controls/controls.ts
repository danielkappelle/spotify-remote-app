import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../app/app.config';

import { AuthService } from '../auth/auth';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class ControlsService {
    constructor(private auth: AuthService, private http: HTTP) { }

    private getHeaders(): object {
        return {'Authorization': `Bearer ${this.auth.accessToken}`};
    }

    private performRequest(endpoint, method, parameters): Promise<object> {
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
                break;

                case 'PUT':
                this.http.put(`${API_ENDPOINT}${endpoint}`, parameters, this.getHeaders())
                .then(data => {
                    resolve(JSON.parse(data.data))
                })
                .catch(err => {
                    reject(err)
                })
                break;
                
            }
        })
    }

    public play(): void {
        this.performRequest('/me/player/play', 'PUT', {});
    }

    public pause(): void {
        this.performRequest('/me/player/pause', 'PUT', {})
    }
}