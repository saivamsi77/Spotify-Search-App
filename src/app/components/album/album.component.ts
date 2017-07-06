import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';


@Component({
  moduleId:module.id,
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {

  id:string;
  album:Album[];

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotifyService.getToken()
          .subscribe(data => {
            this.spotifyService.getAlbum(id, data.access_token)
              .subscribe(album => {
                this.album = album;
                console.log(album.tracks)
              })
          })
      })
  }

}
