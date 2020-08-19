import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChange} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService } from "../../../shared/api.service";
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-map-objects',
  templateUrl: './map-objects.component.html',
  styleUrls: ['./map-objects.component.css']
})
export class MapObjectsComponent implements OnInit {

  @ViewChild('titleInput') titleInput: ElementRef;
  @Input() objects: any[] = []

  private subscription: Subscription = new Subscription();

  title: string = ''

  constructor(private API: ApiService, private modalService: ModalService) { }

  delete(event) {
    this.modalService.data$.next({ type: 'delete', title: 'Удалить объект', state: true, data: { id: event.target.parentElement.parentElement.dataset.id } })
    event.stopPropagation()
  }

  create() {
    this.modalService.data$.next({ type: 'create', title: 'Добавить объект', state: true, data: { coordinates: { latitude: 0, longitude: 0 } } })
  }

  select(event) {
    this.API.selectObject(event.currentTarget.dataset.id)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.API.id$.subscribe((id) => {
      const objectRows = document.getElementsByClassName('row')
      for (let index = 0; index < objectRows.length; index++) {
        const row = <HTMLElement>objectRows[index];
        row.classList.remove('row--selected')
        if (Number(row.dataset.id) == id) {
          row.classList.add('row--selected')
          row.scrollIntoView()
        }
      }
    }))
  }

  ngAfterViewInit() {
    fromEvent(this.titleInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap(async (event) => {
          const title = <HTMLInputElement>this.titleInput.nativeElement.value
          this.API.filterObjects(title)
        })
      )
      .subscribe();
  }
}
