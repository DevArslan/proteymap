import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  data$ = new Subject<{ type: string, title: string, state: boolean, data: any }>()

  constructor() { }

}
