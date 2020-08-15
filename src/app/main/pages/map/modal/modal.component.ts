import { Component, OnInit } from '@angular/core';
import { ModalService } from "../shared/modal.service";
import { ApiService } from "../../../shared/api.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  data: { type: string, title: string, state: boolean, data: any } = { type: '', title: '', state: false, data: {} }

  title: string = ''
  latitude: number
  longitude: number

  constructor(private modalService: ModalService, private API: ApiService) { }

  create(){
    const data = {
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
    }
    this.API.createObject(data)
  }

  ngOnInit(): void {
    this.modalService.data$.subscribe((data) => {
      this.data = data
      this.latitude = data.data.coordinates.lat
      this.longitude =  data.data.coordinates.lng
    })
  }

}
