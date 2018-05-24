import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlayground} from '../shared/playground';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() public playgrounds: IPlayground[];
  @Input() public selectedPlayground: IPlayground;
  @Output() public select = new EventEmitter<IPlayground>();

  constructor() {
  }

  ngOnInit() {
  }

  public selectPlayground(playground: IPlayground) {
    this.select.emit(playground);
    this.selectedPlayground = playground;
  }

}
