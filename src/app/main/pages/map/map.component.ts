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

  objects: { 'title': string, 'x': number, 'y': number }[] = [
    { 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'title': 'Второе место', 'x': 51.505, 'y': -0.11 },
    { 'title': 'Третье место', 'x': 51.505, 'y': -0.15 },
    { 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'title': 'Первое место', 'x': 51.505, 'y': -0.09 }]

  constructor(private API: ApiService) { }

  ngOnInit(): void {

    const mapElement = L.map('map')
      .setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(mapElement);

    this.objects.forEach((object) => {
      var marker = L.marker([object.x, object.y]).addTo(mapElement);
      marker.bindPopup(object.title)
    })

    this.API.objects$.subscribe((objects) => {
      this.objects = objects

      this.objects.forEach((object) => {
        var marker = marker([object.x, object.y]).addTo(mapElement);
        marker.bindPopup(object.title)
      })
    })

  }
}
