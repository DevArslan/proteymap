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

  error: { title: string, latitude: string, longitude: string } = { title: '', latitude: '', longitude: '' }

  constructor(private modalService: ModalService, private API: ApiService) { }

  close() {
    this.title = ''
    this.data = { type: '', title: '', state: false, data: { coordinates: { lat: 0, lng: 0 }, id: null } }
    this.modalService.data$.next(this.data)
    this.resetErrors();
  }

  validate(data){
    if (!data.latitude || /^(?=.)-?((8[0-9]?)|90||([0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(data.latitude) == false) {
      this.error.latitude = 'Введите корректное значение широты'
      return false
    }
    if (!data.longitude || /^(?=.)-?((0?[8-9][0-9])|180|([0-1]?[0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/.test(data.longitude) == false) {
      this.error.longitude = 'Введите корректное значение долготы'
      return false
    }
    if (!data.title) {
      this.error.title = 'Введите название'
      return false
    }
    return true
  }

  create() {
    const data = {
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
    }
    if(this.validate(data)){
      this.API.createObject(data)
      this.close()
    }else{
      setTimeout(() => {
        this.resetErrors();
      }, 2500);
    }
  }

  delete() {
    const objectId = this.data.data.id
    this.API.deleteObject(objectId)
    this.close()
  }

  resetErrors() {
    this.error = { title: '', latitude: '', longitude: '' }
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
