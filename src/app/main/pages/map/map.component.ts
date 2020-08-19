import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import L from "leaflet";
import { ApiService } from "../../shared/api.service";
import { ModalService } from "./shared/modal.service";
import redIcon from 'src/assets/icons/room-red-48dp.svg'
import blueIcon from 'src/assets/icons/room-blue-48dp.svg'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('map') map: ElementRef;

  private subscription: Subscription = new Subscription();

  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = []
  markers: any[]

  constructor(private API: ApiService, private modalService: ModalService) { }

  selectMarker(event) {
    this.API.selectObject(event.target.id)
  }

  createObjectOnMap(event) {
    const coordinates = event.latlng
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: { coordinates } })
  }

  deleteObjectFromMap(event) {
    this.modalService.data$.next({ type: 'delete', title: 'Удалить объект', state: true, data: { id: event.target.dataset.id } })
  }

  makePopup(object) {
    return (`<div><p>${object.title}</p><button class="delete" id="delete" data-id =${object.id}>Удалить</button></div>`)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.map.nativeElement.removeEventListener('click')
  }

  ngOnInit(): void {    

    const defaultIcon = L.icon({
      iconUrl: blueIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const selectedIcon = L.icon({
      iconUrl: redIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const map = L.map('map')
      .setView([51.505, -0.09], 13);

    map.on('click', this.createObjectOnMap.bind(this));

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(map);

    var markersLayer = L.layerGroup()
      .addTo(map);

    this.markers = markersLayer._layers

    this.subscription.add(this.API.objects$.subscribe((objects) => {
      markersLayer.clearLayers();
      this.objects = objects
      this.objects.forEach((object) => {
        var marker = L.marker([object.latitude, object.longitude], { icon: defaultIcon }).addTo(markersLayer).on('click', this.selectMarker.bind(this));
        marker.bindPopup(this.makePopup(object))
        marker.id = object.id
      })
      this.markers = Object.values(markersLayer._layers)
    }))

    this.subscription.add(this.API.id$.subscribe((id) => {
      this.markers.forEach((marker) => {
        if (marker.id == id) {
          marker.setIcon(selectedIcon)
          map.flyTo(marker.getLatLng());
        } else {
          marker.setIcon(defaultIcon)
        }
      })
    }))

    this.API.getObjects()
  }
  ngAfterViewInit(): void{
    this.map.nativeElement.addEventListener('click', (event) => {
      if (event.target.id == "delete") {
        this.deleteObjectFromMap(event);
      }
    })
  }
}
