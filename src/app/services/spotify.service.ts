import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Artist } from '../../../Artist';
import { Album } from '../../../Album';
 
@Injectable()

export class SpotifyService{
    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;

    // App ids
  private client_id: string = 'fafd36c89e044e0f8f84fdddd9554b63';
  private client_secret: string = '7af5a659d984495587ba2e1e2fa12dd4';
  //private token: string;

    constructor(private _http:Http){

    }

    getToken() {
    let headers = new Headers();
    let cor = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
      .map(res => res.json());
  }
 

    searchMusic(str: string,type: 'artist', token: string){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' +str+ '&offset=0&limit=20&type=' + type + '&market=US';
        return this._http.get(this.searchUrl, {headers: headers})
        .map(res => res.json());
    }

    getArtist(id: string, token: string){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this._http.get(this.artistUrl, {headers: headers})
            .map(res => res.json());
    }

    getAlbums(artistId: string, token: string){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId +  '/albums/?limit=50&market=US';
        return this._http.get(this.albumsUrl, {headers: headers})
            .map(res => res.json());
    }

    getAlbum(id: string, token: string) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
        return this._http.get(this.albumUrl, {headers: headers})
            .map(res => res.json())

    }
}