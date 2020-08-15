import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../../../shared/api.service";

@Component({
  selector: 'app-map-objects',
  templateUrl: './map-objects.component.html',
  styleUrls: ['./map-objects.component.css']
})
export class MapObjectsComponent implements OnInit {

  @Input() objects: any[] = []

  constructor(private API: ApiService) { }

  delete(event) {
    const objectId = event.target.parentElement.parentElement.dataset.id
    this.API.deleteObject(objectId)
  }

  ngOnInit(): void {
    console.log(this.objects)
  }

}
