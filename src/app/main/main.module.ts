import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapComponent } from './pages/map/map.component';
import { MainRoutingModule } from "./main-routing.module";
import { MapObjectsComponent } from './pages/map/map-objects/map-objects.component';
import { ModalComponent } from './pages/map/modal/modal.component';

import { ModalService } from "./pages/map/shared/modal.service";
import { ApiService } from "./shared/api.service";
import { ObjectsFilterPipe } from './pipes/objects-filter.pipe';

@NgModule({
  declarations: [
    MainComponent,
    MapComponent,
    MapObjectsComponent,
    ModalComponent,
    ObjectsFilterPipe,
  ],
  imports: [FormsModule, CommonModule, MainRoutingModule],
  providers: [ApiService, ModalService],
  bootstrap: [MainComponent],
})
export class MainModule { }
