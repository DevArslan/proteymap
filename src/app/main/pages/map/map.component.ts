import { Component, OnInit } from '@angular/core';
import { map, control, tileLayer } from "leaflet";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const mapElement = map('map', { zoomControl: false })
      .setView([51.505, -0.09], 13);

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
      .addTo(mapElement);
    const zoom = control.zoom({ position: "topright" });
    zoom.addTo(mapElement);

    const scale = control.scale({ position: "bottomright" });
    scale.addTo(mapElement);
  }

}
