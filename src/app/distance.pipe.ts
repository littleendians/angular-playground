import {Pipe, PipeTransform} from '@angular/core';
import {LocationService} from './shared/location.service';
import {ICoordinate} from './shared/coordinate';

@Pipe({
  name: 'distance',
  pure: false
})
export class DistancePipe implements PipeTransform {

  private location: ICoordinate;

  public constructor(private service: LocationService) {
    service.current.subscribe(location => this.location = location);
  }

  transform(value: ICoordinate, args?: any): any {
    if (!this.location) {
      return 'Ukendt';
    }
    return `${this.service.getDistance(value, this.location)} m`;
  }

}
