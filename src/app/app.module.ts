import { LocationService } from './shared/location.service';
import { LeafletModule } from './leaflet/leaflet.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import 'rxjs/Rx';
import {SidebarComponent} from './sidebar/sidebar.component'
import {PlaygroundService} from "./shared/playground.service";
import {HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import { MapComponent } from './map/map.component';
import { DistancePipe } from './distance.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    MapComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: PlaygroundService,
    useClass: PlaygroundService
  },
  LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
