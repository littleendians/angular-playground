import {Injectable} from '@angular/core';
import {IPlayground} from './playground';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlaygroundService {

  private request$: Observable<IPlayground[]>

  constructor(private http: HttpClient) {
    this.request$ = http.get<IPlayground[]>('assets/copenhagen.json')
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
