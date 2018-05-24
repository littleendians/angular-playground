import {Component, Input} from '@angular/core';
import {IPlayground} from '../shared/playground';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() public playground: IPlayground;

}
