import {Component, OnInit} from '@angular/core';
import {Marker} from '../leaflet';
import {IPlayground} from '../shared/playground';
import {LocationService} from '../shared/location.service';
import {PlaygroundService} from '../shared/playground.service';
import {Observable} from 'rxjs/Rx';
import {Center} from '../leaflet/center';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public parentPlaygrounds: IPlayground[];
  public playground: IPlayground;
  public center = new Center(52, 12);
  public marker$: Observable<Marker>;

  constructor(private service: PlaygroundService,
              private locationService: LocationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.service.getPlaygrounds()
      .combineLatest(this.locationService.current.startWith(null), (playgrounds, location) => {
        if (!location) {
          return playgrounds;
        }
        const l = this.locationService;
        return playgrounds.sort((a, b) => l.getDistance(a.position, location) - l.getDistance(b.position, location))
      })
      .subscribe(playgrounds => this.parentPlaygrounds = playgrounds);
    const playground$ = this.route.params
      .pluck<Params, string>('id')
      .filter(id => !!id)
      .switchMap(id => this.service.findById(id))
      .filter(playground => !!playground);
    playground$.subscribe(playground => this.playground = playground);
    this.marker$ = this.locationService.current.map(location => new Marker('me', location.lat, location.lng))
      .merge(playground$.map(p => new Marker('legeplads', p.position.lat, p.position.lng)));
    playground$.subscribe(p => this.center = new Center(p.position.lat, p.position.lng, 15));
  }

  public selectPlayground(playground: IPlayground) {
    this.router.navigate([playground.id]);
  }
}
