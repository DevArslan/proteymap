import { Component, OnInit, HostListener } from '@angular/core';
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

  @HostListener('document:click', ['$event']) clickout(event) { 
    if(event.target.classList.contains("delete")){ this.deleteObjectFromMap(event); } }

  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = []

  constructor(private API: ApiService, private modalService: ModalService) { }

  createObjectOnMap(event) {
    const coordinates = event.latlng
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: { coordinates } })
  }

  deleteObjectFromMap(event) {
    const objectId = event.target.dataset.id
    this.API.deleteObject(objectId)
  }

  makePopup(object){
    return(`<div><p>${object.title}</p><button class="delete" data-id =${object.id}>Удалить</button></div>`)
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
      markersLayer.clearLayers();
      this.objects = objects
      this.objects.forEach((object) => {
        var marker = L.marker([object.latitude, object.longitude]).addTo(markersLayer);
        // marker.bindPopup(object.title)
        marker.bindPopup(this.makePopup(object))
      })
    })



    this.API.getObjects()

  }
}
