import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';
import { HttpModule } from '@angular/http';
import { Artist } from '../../../../Artist';
import { AppRoutingModule } from '../../app-routing.module';


@Component({
  moduleId:module.id,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService]
})
export class SearchComponent implements OnInit {

  searchStr: string;
  searchRes: Artist[];

  constructor(private spotifyService:SpotifyService) { }

  searchMusic() {
    this.spotifyService.getToken()
      .subscribe(res => this.spotifyService.searchMusic(this.searchStr,"artist", res.access_token)
        .subscribe(res => {
          this.searchRes = res.artists.items;
        })
      );
  }


  ngOnInit() {
  }

}
