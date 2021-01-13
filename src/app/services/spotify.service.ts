import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { 
    console.log('Servicio listo para usarse');
    
  }

  getQuery( query: string ){

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDtHvaH40wWVbEa-F4O7vZzLkQG6ViS_w8U6rcVK1FcDKr3LlHVr7WmePssqSNAwcSDWlHHrIMhvnB2o28'
    })

    return this.http.get(url, { headers })


  }

  getNewRealeses(){

      return this.getQuery('browse/new-releases')
      .pipe( map( data => data['albums'].items));

  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
    .pipe( map( dataSearch => dataSearch['artists'].items) )

  }

  getArtista( id: string ){
    return this.getQuery(`artists/${ id }`);
    /* .pipe( map( dataSearch => dataSearch['artists'].items ) ) */
  }

  getTopTracks( id: string ){
    return this.getQuery(`artists/${ id }/top-tracks?market=us`)
    .pipe( map( data => data['tracks']) )
  }
}








/*     const headers = new HttpHeaders({
  'Authorization': 'Bearer BQA1MtloKHWPT57jP3bPL5IvVo6655ImvME3REMWAvr1wKvMnanNFpEPTFAZJXVHq2jY2lx8EgYjvjX0G3g'
}) */


/*  return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
 .pipe( map( dataSearch =>  dataSearch['artists'].items)); */