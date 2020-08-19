import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import objectsJSON from 'src/assets/data/objects.json';
import { ObjectsFilterPipe } from "../pipes/objects-filter.pipe";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = []
  filterInput = ''

  objects$ = new Subject<any>()
  id$ = new Subject<number>()

  constructor(private objectsFilter: ObjectsFilterPipe) { }

  getObjects() {
    this.objects$.next(objectsJSON)
    this.objects = objectsJSON
  }

  deleteObject(id) {
    this.objects.forEach((object, index) => {
      if (object.id == id) {
        this.objects.splice(index, 1)
      }
    })
    this.objects$.next(this.objectsFilter.transform(this.objects,this.filterInput))
  }

  createObject(data) {
    const object = {
      id: (this.objects.length + 1),
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.objects.push(object)
    this.objects$.next(this.objectsFilter.transform(this.objects,this.filterInput))
  }

  filterObjects(title) {
    this.filterInput = title
    this.objects$.next(this.objectsFilter.transform(this.objects,title))
  }

  selectObject(id) {
    this.id$.next(id)
  }
}
