import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  objects: { 'id': number, 'title': string, 'latitude': number, 'longitude': number }[] = [
    { 'id': 1, 'title': 'Первое место', 'latitude': 51.505, 'longitude': -0.09 },
    { 'id': 2, 'title': 'Второе место', 'latitude': 51.505, 'longitude': -0.11 },
    { 'id': 3, 'title': 'Третье место', 'latitude': 51.505, 'longitude': -0.15 },
    { 'id': 4, 'title': 'Первое место', 'latitude': 51.505, 'longitude': -0.09 },
    { 'id': 5, 'title': 'Первое место', 'latitude': 51.505, 'longitude': -0.09 },
    { 'id': 6, 'title': 'Первое место', 'latitude': 51.505, 'longitude': -0.09 },
    { 'id': 7, 'title': 'Первое место', 'latitude': 51.505, 'longitude': -0.09 }]

  objects$ = new Subject<any>()

  constructor() { }

  getObjects(){
    this.objects$.next(this.objects)
  }

  deleteObject(id){
    console.log(id)
    this.objects.forEach((object, index)=>{
      if(object.id == id){
        this.objects.splice(index,1)
      }
    })
    this.objects$.next(this.objects)
  }

  createObject(data){
    const object = {
        id: (this.objects.length + 1),
        title: data.title,
        latitude: data.latitude,
        longitude: data.longitude
    }
    this.objects.push(object)
    this.objects$.next(this.objects)
  }
}
