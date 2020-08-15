import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  objects: { 'id': number, 'title': string, 'x': number, 'y': number }[] = [
    { 'id': 1, 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'id': 2, 'title': 'Второе место', 'x': 51.505, 'y': -0.11 },
    { 'id': 3, 'title': 'Третье место', 'x': 51.505, 'y': -0.15 },
    { 'id': 4, 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'id': 5, 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'id': 6, 'title': 'Первое место', 'x': 51.505, 'y': -0.09 },
    { 'id': 7, 'title': 'Первое место', 'x': 51.505, 'y': -0.09 }]

  objects$ = new Subject<any>()

  constructor() { }

  getObjects(){
    this.objects$.next(this.objects)
  }

  deleteObject(){

  }
}
