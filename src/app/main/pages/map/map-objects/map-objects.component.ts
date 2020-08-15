import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-objects',
  templateUrl: './map-objects.component.html',
  styleUrls: ['./map-objects.component.css']
})
export class MapObjectsComponent implements OnInit {

  @Input() objects: any[] = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.objects)
  }

}
