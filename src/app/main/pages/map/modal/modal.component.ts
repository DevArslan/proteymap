import { Component, OnInit } from '@angular/core';
import { ModalService } from "../shared/modal.service";
import { ApiService } from "../../../shared/api.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  data: { type: string, title: string, state: boolean, data: any } = { type: '', title: '', state: false, data: { coordinates: { lat: 0, lng: 0 }, id: null } }

  title: string = ''
  latitude: number
  longitude: number

  constructor(private modalService: ModalService, private API: ApiService) { }

  close() {
    this.title = ''
    this.data = { type: '', title: '', state: false, data: { coordinates: { lat: 0, lng: 0 }, id: null } }
    this.modalService.data$.next(this.data)
  }

  create() {
    const data = {
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
    }
    this.API.createObject(data)
    this.close()
  }

  delete() {
    const objectId = this.data.data.id
    this.API.deleteObject(objectId)
    this.close()
  }

  ngOnInit(): void {
    this.modalService.data$.subscribe((data) => {
      this.data = data
      if (data.type == 'create') {
        this.latitude = data.data.coordinates.lat
        this.longitude = data.data.coordinates.lng
      }
    })
  }

}
