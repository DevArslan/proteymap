import { Component, OnInit } from '@angular/core';
import L from "leaflet";
import { ApiService } from "../../shared/api.service";
import { ModalService } from "./shared/modal.service";
import "leaflet/dist/images/marker-shadow.png";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = []

  constructor(private API: ApiService, private modalService: ModalService) { }

  createObjectOnMap(event) {
    const coordinates = event.latlng
    console.log(coordinates)
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: {coordinates} })
  }

  ngOnInit(): void {
    const map = L.map('map')
      .setView([51.505, -0.09], 13);

    map.on('click', this.createObjectOnMap.bind(this));

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(map);

    var markersLayer = L.layerGroup()
      .addTo(map);

    this.API.objects$.subscribe((objects) => {
      console.log(objects)
      markersLayer.clearLayers();
      this.objects = objects
      this.objects.forEach((object) => {
        var marker = L.marker([object.latitude, object.longitude]).addTo(markersLayer);
        marker.bindPopup(object.title)
      })
    })

    this.API.getObjects()

  }
}
