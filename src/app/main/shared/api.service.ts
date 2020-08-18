import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import objectsJSON from 'src/assets/data/objects.json';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = []

  objects$ = new Subject<any>()
  id$ = new Subject<number>()

  constructor() { }

  getObjects() {
    this.objects$.next(objectsJSON)
    this.objects = objectsJSON
  }

  deleteObject(id) {
    console.log(id)
    this.objects.forEach((object, index) => {
      if (object.id == id) {
        this.objects.splice(index, 1)
      }
    })
    this.objects$.next(this.objects)
  }

  createObject(data) {
    const object = {
      id: (this.objects.length + 1),
      title: data.title,
      latitude: data.latitude,
      longitude: data.longitude
    }
    this.objects.push(object)
    this.objects$.next(this.objects)
  }

  selectObject(id) {
    console.log(id)
    this.id$.next(id)
  }
}
