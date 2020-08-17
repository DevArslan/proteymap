import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../../../shared/api.service";
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-map-objects',
  templateUrl: './map-objects.component.html',
  styleUrls: ['./map-objects.component.css']
})
export class MapObjectsComponent implements OnInit {

  @Input() objects: any[] = []
  
  title: string = ''

  constructor(private API: ApiService, private modalService: ModalService) { }

  delete(event) {
    const objectId = event.target.parentElement.parentElement.dataset.id
    this.API.deleteObject(objectId)
  }

  create() {
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: {coordinates:{latitude: 0, longitude:0}}})
  }
  
  select(event){
    this.API.selectObject(event.currentTarget.dataset.id)
  }

  ngOnInit(): void {
    this.API.id$.subscribe((id)=>{
      const objectRows = document.getElementsByClassName('row')
      for (let index = 0; index < objectRows.length; index++) {
        const row = <HTMLElement>objectRows[index];
        row.classList.remove('row--selected')
        if(Number(row.dataset.id) == id){
          row.classList.add('row--selected')
        }
      }
    })
  }

}
