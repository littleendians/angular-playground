import {Injectable} from '@angular/core';
import {IPlayground} from './playground';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlaygroundService {

  private request$: Observable<IPlayground[]>

  constructor(private http: HttpClient) {
    this.request$ = http.get<any>('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy')
      .map(opendata => opendata.features)
      .map(openDataPlaygrounds => openDataPlaygrounds.filter(opendataPlayground => opendataPlayground.geometry))
      .map(openDataPlaygrounds => {
          return openDataPlaygrounds.map(openDataPlayground => {
            return <IPlayground>{
              'id': openDataPlayground.id,
              'name': openDataPlayground.properties.navn,
              'addressDescription': openDataPlayground.properties.adressebeskrivelse,
              'description': openDataPlayground.properties.beskrivelse,
              'position': {
                'lat': openDataPlayground.geometry.coordinates[0][1],
                'lng': openDataPlayground.geometry.coordinates[0][0]
              }
            }
          })
        }
      )
      .publishLast()
      .refCount();

  }

  public getPlaygrounds(): Observable<IPlayground[]> {
    return this.request$;
  }

  public findById(id: string): Observable<IPlayground> {
    return this.request$.map(playgrounds => playgrounds.find(p => p.id === id));
  }

}
