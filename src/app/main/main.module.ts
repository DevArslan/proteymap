import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapComponent } from './pages/map/map.component';
import { MainRoutingModule } from "./main-routing.module";
import { MapObjectsComponent } from './pages/map/map-objects/map-objects.component';
import { ApiService } from "./shared/api.service";

@NgModule({
  declarations: [
    MainComponent,
    MapComponent,
    MapObjectsComponent,
  ],
  imports: [FormsModule, CommonModule, MainRoutingModule],
  providers: [ApiService],
  bootstrap: [MainComponent],
})
export class MainModule { }
