import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../../Artist';
import { Album } from '../../../../Album';
import { ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [SpotifyService]
})

export class ArtistComponent implements OnInit {

  id:string;
  artist: Artist[];
  albums: Album[];
  data:any;

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
              this.spotifyService.getArtist(id, data.access_token)
                .subscribe(artist => {
                  this.artist = artist;
                }),

                this.spotifyService.getAlbums(id, data.access_token)
                .subscribe(albums => {
                  console.log(albums.items)
                  this.albums = albums.items;
                })

            })
        })
  }

}
