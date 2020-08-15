import { Component, OnInit } from '@angular/core';
import L from "leaflet";
import { ApiService } from "../../shared/api.service";
import "leaflet/dist/images/marker-shadow.png";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  objects: { 'id': number, 'title': string, 'x': number, 'y': number }[] = []

  constructor(private API: ApiService) { }

  ngOnInit(): void {

    const mapElement = L.map('map')
      .setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(mapElement);

    var markersLayer = L.layerGroup()
      .addTo(mapElement);

    this.API.objects$.subscribe((objects) => {
      console.log(objects)
      markersLayer.clearLayers();
      this.objects = objects
      this.objects.forEach((object) => {
        var marker = L.marker([object.x, object.y]).addTo(markersLayer);
        marker.bindPopup(object.title)
      })
    })

    this.API.getObjects()

  }
}
