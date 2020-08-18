import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from "../../../shared/api.service";
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-map-objects',
  templateUrl: './map-objects.component.html',
  styleUrls: ['./map-objects.component.css']
})
export class MapObjectsComponent implements OnInit {

  @Input() objects: any[] = []

  private subscription: Subscription = new Subscription();
  
  title: string = ''

  constructor(private API: ApiService, private modalService: ModalService, private elementRef: ElementRef) { }

  delete(event) {
    this.modalService.data$.next({ type: 'delete', title: 'Удалить объект', state: true, data: {id: event.target.parentElement.parentElement.dataset.id}})
    event.stopPropagation()
  }

  create() {
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: {coordinates:{latitude: 0, longitude:0}}})
  }
  
  select(event){
    this.API.selectObject(event.currentTarget.dataset.id)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.API.id$.subscribe((id)=>{
      const objectRows = document.getElementsByClassName('row')
      for (let index = 0; index < objectRows.length; index++) {
        const row = <HTMLElement>objectRows[index];
        row.classList.remove('row--selected')
        if(Number(row.dataset.id) == id){
          row.classList.add('row--selected')
          row.scrollIntoView()
        }
      }
    }))
  }
  // Скролл до нового элемента в таблице
  // ngAfterViewChecked(): void {
  //   const rows = this.elementRef.nativeElement.querySelectorAll('.row');
  //   rows[rows.length-1].scrollIntoView()
  // }

}
