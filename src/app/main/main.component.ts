import { Component, OnInit } from '@angular/core';
import { ApiService } from "./shared/api.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private API: ApiService) { }

  ngOnInit(): void {
    
  }

}
