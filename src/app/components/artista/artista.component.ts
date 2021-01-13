import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {

  artist: any = {};
  loadingArtist: boolean;
  topTracks: any [] = [];
  widgets: boolean;

  constructor( private route: ActivatedRoute,
                private spotify: SpotifyService ) {

    this.loadingArtist = true          
    this.widgets = false    

    this.route.params.subscribe( params =>{
      this.getArtista( params['id']);
      this.getTopTracks( params['id']);
      
    });




   }

   getArtista( id: string ){

    this.loadingArtist = true

    this.spotify.getArtista( id )
    .subscribe( artista => {
      this.artist = artista
      this.loadingArtist = false
      });

   }

   getTopTracks( id: string ){

    this.spotify.getTopTracks( id )
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;
        });

   }
}
