import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { MainComponent } from './main.component';

const childRoutes: Routes = [
    {
        path: 'map',
        component: MapComponent,
    },
];

const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: childRoutes,
    },
  ];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
